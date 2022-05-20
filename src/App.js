import { useEffect, useState } from "react";
import Cep from "react-simple-cep-mask";

import { FaSearch } from "react-icons/fa";

import api from './services/api';


import "./assets/css/global.css";
import "./assets/css/index.css";


function App() {
  const [cep, setCep] = useState("");

  useEffect(() => {
    sessionStorage.removeItem('tempCep');
  });

  async function handleSearch(e) {
    e.preventDefault();

    const aux = sessionStorage.getItem("tempCep") || null;

    if (cep.length > 0) {
      document.getElementById("search").removeAttribute("class");
      slideUp( document.getElementById("messageError"), 1000);

      if (aux == null || aux != cep) {

        try {
          const auxCep = cep.replace("-", "");
          const response = await api.get(`${auxCep}/json/`);

          console.log('cep', response);

          if (response.error == undefined) {

            Object.entries(response.data).forEach(item => {

              console.log(item);

              let key = item[0];
              let value = item[1];

              if (document.getElementById(key) != undefined) {
                document.getElementById(key).innerText = value;
              }

            });

          } else {

            alert("CEP inválido ou não encontrado.");

            clearText();

          }


          sessionStorage.setItem('tempCep', cep);
        } catch (err) {
          alert('Falha ao tentar fazer busca por CEP.');
        }

      } else {
        alert('Os dados já foram carregados. Tente novamente com outro CEP.')
        clearText();
      }

    } else {
      document.getElementById("search").setAttribute("class", "error");
      slideDown( document.getElementById("messageError"), 1000);
    }
  }

  function clearText() {
    document.getElementById("cep").innerText = "";
    document.getElementById("uf").innerText = "";
    document.getElementById("localidade").innerText = "";
    document.getElementById("bairro").innerText = "";
    document.getElementById("logradouro").innerText = "";
    document.getElementById("numero").innerText = "";
    document.getElementById("complemento").innerText = "";
  }

  /* SLIDE UP */
  function slideUp(target, duration=500) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    // target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }
  
  /* SLIDE DOWN */
  function slideDown (target, duration=500) {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    // target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }

  return (
    <>
      <div className="card">

        <div className="card--header">
          <h1>Consultar <span>CEP</span></h1>
        </div>

        <div className="card--body">

          <div className="body--row">

            <div className="row--column">
              <div id="search">
                <Cep
                  value={cep}
                  onChange={(cep) => setCep(cep)}
                  placeholder="Consultar CEP"
                />
                <button onClick={(e) => { handleSearch(e) }}><FaSearch /></button>
              </div>
              <div id="messageError">
                <p >Preencha o campo acima para prosseguir.</p>
              </div>
            </div>

          </div>

          <div className="body--row fields">

            <div className="row--column">

              <p>Cep: <span id="cep"></span></p>

            </div>

            <div className="row--column">

              <p>Estado (UF): <span id="uf"></span></p>

            </div>

          </div>

          <div className="body--row fields">

            <div className="row--column">

              <p>Cidade: <span id="localidade"></span></p>

            </div>

            <div className="row--column">

              <p>Bairro: <span id="bairro"></span></p>

            </div>

          </div>

          <div className="body--row fields">

            <div className="row--column">

              <p>Logradouro: <span id="logradouro"></span></p>

            </div>

            <div className="row--column">

              <p>Numero: <span id="numero"></span></p>

            </div>

          </div>

          <div className="body--row fields">

            <div className="row--column">

              <p>Complemento: <span id="complemento"></span></p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default App;
