// FAIS Bienestar: modo claro/oscuro, buscador de la portada (lugares.json) y filtro de municipios del estado.
(function () {
  try {
    var t = localStorage.getItem("tema");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}

  function normal(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var boton = document.getElementById("tema");
    if (boton) {
      boton.addEventListener("click", function () {
        var raiz = document.documentElement;
        var oscuro = raiz.getAttribute("data-theme") === "dark" ||
          (!raiz.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        var nuevo = oscuro ? "light" : "dark";
        raiz.setAttribute("data-theme", nuevo);
        try { localStorage.setItem("tema", nuevo); } catch (e) {}
      });
    }

    // Buscador: [nombre, ruta] de los 32 estados y los municipios ("Zapopan, Jalisco").
    var forma = document.getElementById("buscar");
    if (forma) {
      var lugares = null, pidiendo = null;
      var lista = document.getElementById("lugares");
      var nota = document.getElementById("buscar-nota");
      var cargar = function () {
        if (!pidiendo) {
          pidiendo = fetch("/lugares.json").then(function (r) { return r.json(); }).then(function (d) {
            lugares = d;
            var frag = document.createDocumentFragment();
            d.forEach(function (l) { var o = document.createElement("option"); o.value = l[0]; frag.appendChild(o); });
            lista.appendChild(frag);
            return d;
          });
        }
        return pidiendo;
      };
      forma.lugar.addEventListener("focus", cargar, { once: true });
      forma.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var q = normal(forma.lugar.value);
        if (!q) return;
        cargar().then(function (d) {
          var exacto = d.filter(function (l) { return normal(l[0]) === q; });
          var empieza = d.filter(function (l) { return normal(l[0]).indexOf(q) === 0; });
          var tiene = d.filter(function (l) { return normal(l[0]).indexOf(q) !== -1; });
          var hallado = exacto[0] || (empieza.length === 1 ? empieza[0] : null) || (tiene.length === 1 ? tiene[0] : null);
          if (hallado) { location.href = "/" + hallado[1] + "/"; return; }
          var opciones = (empieza.length ? empieza : tiene).slice(0, 6).map(function (l) { return l[0]; });
          nota.textContent = opciones.length
            ? "¿Cuál de estos? " + opciones.join(" · ")
            : "No encontramos ese lugar. Escribe el nombre del estado o del municipio.";
        }).catch(function () {
          nota.textContent = "No pudimos cargar la lista de lugares. Elige tu estado más abajo.";
        });
      });
    }

    // Filtro de la tabla de municipios del estado
    var filtro = document.getElementById("filtro-municipios");
    if (filtro) {
      var filas = document.querySelectorAll("#tabla-municipios tbody tr");
      filtro.addEventListener("input", function () {
        var q = normal(filtro.value);
        filas.forEach(function (f) { f.hidden = !!q && f.getAttribute("data-n").indexOf(q) === -1; });
      });
    }
  });
})();
