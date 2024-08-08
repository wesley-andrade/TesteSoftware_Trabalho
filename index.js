//Espera até que o DOM esteja completamente carregado antes de executar o código.
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const main = document.querySelector("main");
  const input = document.getElementById("input");
  const resultInput = document.getElementById("result");
  const themeSwitcher = document.getElementById("themeSwitcher");
  const calcType = document.getElementById("calcType");
  const powerRootInputs = document.getElementById("powerRootInputs");
  const baseInput = document.getElementById("base");
  const exponentInput = document.getElementById("exponent");
  const unitConversionInputs = document.getElementById("unitConversionInputs");
  const unitType = document.getElementById("unitType");
  const unitValueInput = document.getElementById("unitValue");
  const historySection = document.getElementById("history");
  const historyList = document.getElementById("historyList");
  const toggleHistoryButton = document.getElementById("toggleHistory");
  const decimalButton = document.querySelector('.charKey[data-value="."]');
  let calculationHistory = [];
  let activeInput = input;

  //Adiciona um evento para alternar entre tema claro e escuro ao clicar no botão de troca de tema.
  themeSwitcher.addEventListener("click", () => {
    const isDark = main.dataset.theme === "dark";
    root.style.setProperty("--bg-color", isDark ? "#f1f5f9" : "#212529");
    root.style.setProperty("--font-color", isDark ? "#212529" : "#f1f5f9");
    root.style.setProperty("--border-color", isDark ? "#aaa" : "#666");
    root.style.setProperty("--primary-color", isDark ? "#26834a" : "#4dff91");
    main.dataset.theme = isDark ? "light" : "dark";
  });

  //Adiciona um evento para limpar todos os campos ao clicar no botão de limpar.
  document.getElementById("clear").addEventListener("click", () => {
    input.value = "";
    baseInput.value = "";
    exponentInput.value = "";
    unitValueInput.value = "";
  });

  //Adiciona um evento para inserir o valor dos botões de caracteres no campo de entrada.
  document.querySelectorAll(".charKey").forEach((charKeyBtn) => {
    charKeyBtn.addEventListener("click", () => {
      activeInput.value += charKeyBtn.dataset.value;
    });
  });

  //Adiciona um evento para permitir a entrada de caracteres válidos no campo de entrada e outros campos.
  input.addEventListener("keydown", handleKeydown);
  baseInput.addEventListener("keydown", handleKeydown);
  exponentInput.addEventListener("keydown", handleKeydown);
  unitValueInput.addEventListener("keydown", handleKeydown);

  //Adiciona um evento para definir o input ativo quando clicado
  input.addEventListener("focus", () => (activeInput = input));
  baseInput.addEventListener("focus", () => (activeInput = baseInput));
  exponentInput.addEventListener("focus", () => (activeInput = exponentInput));
  unitValueInput.addEventListener(
    "focus",
    () => (activeInput = unitValueInput)
  );

  //Adiciona um evento para calcular o resultado ao clicar no botão de igual.
  document.getElementById("equal").addEventListener("click", calculate);

  //Função para tratar a entrada de teclas permitidas e operações no campo de entrada.
  function handleKeydown(ev) {
    ev.preventDefault();
    const allowedKeys = [
      "(",
      ")",
      "/",
      "*",
      "-",
      "+",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "1",
      "0",
      ".",
      ",",
      "%",
      " ",
    ];
    if (allowedKeys.includes(ev.key)) {
      if (
        ev.key === "," &&
        ["mean", "median", "mode"].includes(calcType.value)
      ) {
        ev.target.value += ev.key;
      } else if (
        ev.key === "." &&
        !["mean", "median", "mode"].includes(calcType.value)
      ) {
        ev.target.value += ev.key;
      } else if (ev.key !== "," && ev.key !== ".") {
        ev.target.value += ev.key;
      }
    } else if (ev.key === "Backspace") {
      ev.target.value = ev.target.value.slice(0, -1);
    } else if (ev.key === "Enter") {
      calculate();
    }
  }

  //Função para realizar o cálculo com base no tipo selecionado.
  function calculate() {
    const selectedCalcType = calcType.value;
    let result;
    try {
      switch (selectedCalcType) {
        case "mean":
          result = calculateMean(input.value.split(",").map(Number));
          break;
        case "median":
          result = calculateMedian(input.value.split(",").map(Number));
          break;
        case "mode":
          result = calculateMode(input.value.split(",").map(Number));
          break;
        case "power":
          result = Math.pow(
            Number(baseInput.value),
            Number(exponentInput.value)
          );
          break;
        case "root":
          result = Math.pow(
            Number(baseInput.value),
            1 / Number(exponentInput.value)
          );
          break;
        case "length":
          result = convertLength(Number(unitValueInput.value), unitType.value);
          break;
        case "volume":
          result = convertVolume(Number(unitValueInput.value), unitType.value);
          break;
        default:
          result = evalExpression(input.value);
      }
      if (isNaN(result) || !isFinite(result)) {
        throw new Error("Resultado inválido");
      }

      resultInput.value = result;
      addToHistory(`${input.value} = ${result}`);
      resultInput.classList.remove("error");
    } catch (error) {
      resultInput.value = "Erro";
      resultInput.classList.add("error");
    }
    clearInputs();
  }

  //Função para avaliar expressões matemáticas usando a biblioteca math.js.
  function evalExpression(expression) {
    try {
      return math.evaluate(expression);
    } catch {
      return "Operação inválida";
    }
  }

  //Função para calcular a média dos valores.
  function calculateMean(values) {
    const sum = values.reduce((acc, num) => acc + num, 0);
    return sum / values.length;
  }

  //Função para calcular a mediana dos valores.
  function calculateMedian(values) {
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 !== 0
      ? values[mid]
      : (values[mid - 1] + values[mid]) / 2;
  }

  //Função para calcular a moda dos valores.
  function calculateMode(values) {
    const freq = {};
    values.forEach((val) => (freq[val] = (freq[val] || 0) + 1));
    let maxFreq = 0;
    let modes = [];
    for (const key in freq) {
      if (freq[key] > maxFreq) {
        modes = [key];
        maxFreq = freq[key];
      } else if (freq[key] === maxFreq) {
        modes.push(Number(key));
      }
    }
    return modes.length === values.length ? "Sem moda" : modes.join(",");
  }

  //Função para converter comprimento entre cm e m.
  function convertLength(value, type) {
    return type === "cmToM" ? value / 100 : value * 100;
  }

  //Função para converter volume entre L e ML.
  function convertVolume(value, type) {
    return type === "lToMl" ? value * 1000 : value / 1000;
  }

  //Função para adicionar cálculos ao histórico e atualizar a lista de histórico.
  function addToHistory(calculation) {
    calculationHistory.push(calculation);
    updateHistory();
  }

  //Função para atualizar a lista de histórico.
  function updateHistory() {
    historyList.innerHTML = "";
    calculationHistory.forEach((calc) => {
      const li = document.createElement("li");
      li.textContent = calc;
      historyList.appendChild(li);
    });
  }

  //Função para limpar todos os campos de entrada.
  function clearInputs() {
    input.value = "";
    baseInput.value = "";
    exponentInput.value = "";
    unitValueInput.value = "";
  }

  //Adiciona um evento para alternar a exibição do histórico.
  toggleHistoryButton.addEventListener("click", () => {
    if (historySection.style.display === "block") {
      historySection.style.display = "none";
    } else {
      historySection.style.display = "block";
    }
  });

  //Adiciona um evento para copiar o resultado para a área de transferência ao clicar no botão de copiar.
  document.getElementById("copyToClipboard").addEventListener("click", () => {
    navigator.clipboard
      .writeText(resultInput.value)
      .then(() => {
        const copyButton = document.getElementById("copyToClipboard");
        copyButton.textContent = "Copiado";
        setTimeout(() => {
          copyButton.textContent = "Copiar";
        }, 2000);
      })
      .catch((err) => {
        console.error("Erro ao copiar para a área de transferência: ", err);
      });
  });

  //Função para mudar o valor do '.' para ',' e vise versa
  function updateDecimalButton() {
    const selectedCalcType = calcType.value;
    if (["mean", "median", "mode"].includes(selectedCalcType)) {
      decimalButton.dataset.value = ",";
      decimalButton.textContent = ",";
    } else {
      decimalButton.dataset.value = ".";
      decimalButton.textContent = ".";
    }
  }

  //Adiciona um evento para mostrar/ocultar os campos com base no tipo de cálculo selecionado.
  calcType.addEventListener("change", () => {
    const selectedCalcType = calcType.value;
    powerRootInputs.style.display = ["power", "root"].includes(selectedCalcType)
      ? "flex"
      : "none";
    unitConversionInputs.style.display = ["length", "volume"].includes(
      selectedCalcType
    )
      ? "flex"
      : "none";
    input.style.display = ["power", "root", "length", "volume"].includes(
      selectedCalcType
    )
      ? "none"
      : "block";
    input.placeholder = ["mean", "median", "mode"].includes(selectedCalcType)
      ? "Insira os números separados por vírgulas"
      : "Insira os números que deseja calcular";
    if (selectedCalcType === "length") {
      unitType.innerHTML =
        '<option value="cmToM">CM para M</option><option value="mToCm">M para CM</option>';
    } else if (selectedCalcType === "volume") {
      unitType.innerHTML =
        '<option value="lToMl">L para ML</option><option value="mlToL">ML para L</option>';
    }
    updateDecimalButton();
  });

  //Dispara um evento de mudança para configurar o estado inicial da interface.
  calcType.dispatchEvent(new Event("change"));
});
