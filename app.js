const optionSets = {
  time: ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)", "O(n^3)", "O(2^n)", "O(n!)", "O(n + m)", "O(n * m)", "O(n^2 + m)"],
  space: ["O(1)", "O(log n)", "O(n)", "O(n^2)", "O(n^3)", "O(2^n)", "O(n!)", "O(n + m)", "O(n * m)", "O(m)"]
};

const state = {
  current: null,
  selectedTime: "",
  selectedSpace: "",
  score: 0,
  total: 0,
  streak: 0,
  answered: false
};

const els = {
  code: document.getElementById("code"),
  filename: document.getElementById("filename"),
  timeOptions: document.getElementById("timeOptions"),
  spaceOptions: document.getElementById("spaceOptions"),
  checkBtn: document.getElementById("checkBtn"),
  revealBtn: document.getElementById("revealBtn"),
  newBtn: document.getElementById("newBtn"),
  resultPanel: document.getElementById("resultPanel"),
  resultBadge: document.getElementById("resultBadge"),
  timeAnswer: document.getElementById("timeAnswer"),
  spaceAnswer: document.getElementById("spaceAnswer"),
  explanation: document.getElementById("explanation"),
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  curve: document.getElementById("curve")
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function formatExplanation(value) {
  const variableNames = [
    "arrived_set", "copied_labels", "sorted_values",
    "scores", "score", "values", "value", "result", "items", "item",
    "numbers", "number", "ordered", "target", "left", "right", "middle",
    "grid", "row", "col", "line", "expected", "arrived", "missing",
    "name", "labels", "label", "matches", "table", "plane", "rest",
    "perm", "total", "count", "steps", "smallest", "largest",
    "n", "m", "i", "j", "a", "b", "c", "x", "y", "z"
  ];
  const pattern = new RegExp(`\\b(${variableNames.join("|")})\\b`, "g");
  return escapeHtml(value).replace(pattern, "<em>$1</em>");
}

function weightedPick(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function problemPool() {
  return templates;
}

function shuffle(values) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function nearbyOptions(correct, kind) {
  const base = optionSets[kind];
  const correctIndex = base.indexOf(correct);
  const candidates = new Set([correct]);
  const offsets = [-2, -1, 1, 2, 3, -3];

  for (const offset of offsets) {
    if (candidates.size >= 6) break;
    const value = base[correctIndex + offset];
    if (value) candidates.add(value);
  }

  while (candidates.size < 6) {
    candidates.add(base[Math.floor(Math.random() * base.length)]);
  }

  return shuffle([...candidates]).slice(0, 6);
}

function renderOptions(container, values, selected, onPick) {
  container.innerHTML = "";
  for (const value of values) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = value;
    button.setAttribute("aria-pressed", String(value === selected));
    button.addEventListener("click", () => {
      if (state.answered) return;
      onPick(value);
    });
    container.appendChild(button);
  }
}

function refreshChoices() {
  renderOptions(els.timeOptions, state.current.timeChoices, state.selectedTime, value => {
    state.selectedTime = value;
    refreshChoices();
  });
  renderOptions(els.spaceOptions, state.current.spaceChoices, state.selectedSpace, value => {
    state.selectedSpace = value;
    refreshChoices();
  });
  els.checkBtn.disabled = !(state.selectedTime && state.selectedSpace) || state.answered;
  els.revealBtn.disabled = Boolean(state.selectedTime || state.selectedSpace || state.answered);
}

function newProblem() {
  const picked = weightedPick(problemPool());
  state.current = {
    ...picked,
    timeChoices: nearbyOptions(picked.time, "time"),
    spaceChoices: nearbyOptions(picked.preciseSpace || picked.space, "space")
  };
  state.selectedTime = "";
  state.selectedSpace = "";
  state.answered = false;

  els.code.innerHTML = escapeHtml(picked.code);
  els.filename.textContent = picked.filename;
  els.resultPanel.classList.remove("visible");
  refreshChoices();
  drawCurve(false);
}

function markOptions() {
  const correctSpace = state.current.preciseSpace || state.current.space;
  for (const button of els.timeOptions.querySelectorAll(".option")) {
    button.classList.toggle("correct", button.textContent === state.current.time);
    button.classList.toggle("incorrect", button.textContent === state.selectedTime && button.textContent !== state.current.time);
  }
  for (const button of els.spaceOptions.querySelectorAll(".option")) {
    button.classList.toggle("correct", button.textContent === correctSpace);
    button.classList.toggle("incorrect", button.textContent === state.selectedSpace && button.textContent !== correctSpace);
  }
}

function explainMistake(correct) {
  const mistakes = [];
  if (state.selectedTime && state.selectedTime !== state.current.time) {
    mistakes.push(`Time is ${state.current.time}, not ${state.selectedTime}.`);
  }
  if (state.selectedSpace && state.selectedSpace !== correct) {
    mistakes.push(`Space is ${correct}, not ${state.selectedSpace}.`);
  }
  return mistakes.length ? `${mistakes.join(" ")} ${state.current.explain}` : state.current.explain;
}

function checkAnswer(revealed = false) {
  if (state.answered) return;
  const correctSpace = state.current.preciseSpace || state.current.space;
  const correct = state.selectedTime === state.current.time && state.selectedSpace === correctSpace;
  state.answered = true;
  if (!revealed) {
    state.total += 1;
    if (correct) {
      state.score += 1;
      state.streak += 1;
    } else {
      state.streak = 0;
    }
  } else {
    state.streak = 0;
  }

  els.score.textContent = state.score;
  els.streak.textContent = state.streak;
  els.resultBadge.textContent = revealed ? "Revealed" : correct ? "Correct" : "Review";
  els.resultBadge.className = `badge ${correct ? "good" : revealed ? "warn" : "bad"}`;
  els.timeAnswer.textContent = state.current.time;
  els.spaceAnswer.textContent = correctSpace;
  els.explanation.innerHTML = formatExplanation(revealed ? state.current.explain : explainMistake(correctSpace));
  els.resultPanel.classList.add("visible");
  els.checkBtn.disabled = true;
  els.revealBtn.disabled = true;
  markOptions();
  drawCurve(true);
}

function growthValue(label, n) {
  if (label === "O(1)") return 1;
  if (label === "O(log n)") return Math.log2(n + 1);
  if (label === "O(n)") return n;
  if (label === "O(n log n)") return n * Math.log2(n + 1);
  if (label === "O(n^2)") return n * n;
  if (label === "O(n^3)") return n * n * n;
  if (label === "O(2^n)") return 2 ** n;
  if (label === "O(n!)") {
    let out = 1;
    for (let i = 2; i <= n; i += 1) out *= i;
    return out;
  }
  if (label === "O(n + m)") return n * 2;
  if (label === "O(n * m)") return n * n;
  if (label === "O(n^2 + m)") return n * n + n;
  if (label === "O(m)") return n;
  return n;
}

function drawCurve(showAnswers) {
  const canvas = els.curve;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fbfcfe";
  ctx.fillRect(0, 0, width, height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const correctSpace = state.current.preciseSpace || state.current.space;
  const labels = [...new Set([...state.current.timeChoices, ...state.current.spaceChoices])];
  const values = labels.flatMap(label => Array.from({ length: 16 }, (_, i) => growthValue(label, i + 1)));
  const maxLog = Math.log10(Math.max(...values) + 1);
  const leftPad = 52;
  const topPad = 28;
  const rightPad = 118;
  const bottomPad = 48;
  const plotWidth = width - leftPad - rightPad;
  const plotHeight = height - topPad - bottomPad;
  const yFor = value => topPad + plotHeight - (plotHeight * Math.log10(value + 1)) / maxLog;

  ctx.strokeStyle = "#d8dee8";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = topPad + (plotHeight * i) / 4;
    ctx.beginPath();
    ctx.moveTo(leftPad, y);
    ctx.lineTo(width - rightPad, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#98a2b3";
  ctx.beginPath();
  ctx.moveTo(leftPad, topPad);
  ctx.lineTo(leftPad, topPad + plotHeight);
  ctx.lineTo(width - rightPad, topPad + plotHeight);
  ctx.stroke();

  ctx.fillStyle = "#475467";
  ctx.font = "700 16px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Input size (n)", leftPad + plotWidth / 2, height - 16);
  ctx.save();
  ctx.translate(18, topPad + plotHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Rate of Growth", 0, 0);
  ctx.restore();
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";

  const lineData = labels.map((label, index) => {
    const isTime = showAnswers && label === state.current.time;
    const isSpace = showAnswers && label === correctSpace;
    const isSame = isTime && isSpace;
    const points = [];
    for (let n = 1; n <= 16; n += 1) {
      const x = leftPad + (plotWidth * (n - 1)) / 15;
      const y = yFor(growthValue(label, n));
      points.push({ x, y });
    }
    return {
      label,
      points,
      index,
      isTime,
      isSpace,
      isSame,
      color: isSame ? "#0891b2" : isTime ? "#0f766e" : isSpace ? "#2563eb" : "#a9b4c3",
      labelColor: isSame ? "#0891b2" : isTime ? "#0f766e" : isSpace ? "#2563eb" : "#667085",
      labelY: points[points.length - 1].y
    };
  });

  const sortedLabels = [...lineData].sort((a, b) => a.labelY - b.labelY);
  const labelGap = 17;
  const minLabelY = topPad + 12;
  const maxLabelY = topPad + plotHeight - 6;
  sortedLabels.forEach((line, index) => {
    if (index > 0 && line.labelY - sortedLabels[index - 1].labelY < labelGap) {
      line.labelY = sortedLabels[index - 1].labelY + labelGap;
    }
  });
  for (let i = sortedLabels.length - 1; i >= 0; i -= 1) {
    if (sortedLabels[i].labelY > maxLabelY) sortedLabels[i].labelY = maxLabelY;
    if (i < sortedLabels.length - 1 && sortedLabels[i + 1].labelY - sortedLabels[i].labelY < labelGap) {
      sortedLabels[i].labelY = sortedLabels[i + 1].labelY - labelGap;
    }
    if (sortedLabels[i].labelY < minLabelY) sortedLabels[i].labelY = minLabelY;
  }

  lineData.forEach(line => {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.isTime || line.isSpace ? 4 : 2;
    ctx.setLineDash(line.isSame ? [7, 5] : []);
    ctx.beginPath();
    line.points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  });

  lineData.forEach(line => {
    const end = line.points[line.points.length - 1];
    const labelX = width - rightPad + 12;
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 1;
    ctx.setLineDash(line.isSame ? [4, 4] : []);
    ctx.beginPath();
    ctx.moveTo(end.x + 4, end.y);
    ctx.lineTo(labelX - 5, line.labelY - 4);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = line.labelColor;
    ctx.font = `${line.isTime || line.isSpace ? "700" : "600"} 13px ui-monospace, Menlo, Consolas, monospace`;
    ctx.fillText(line.label, labelX, line.labelY);
  });
}

els.checkBtn.addEventListener("click", () => checkAnswer(false));
els.revealBtn.addEventListener("click", () => {
  if (els.revealBtn.disabled) return;
  state.selectedTime = state.current.time;
  state.selectedSpace = state.current.preciseSpace || state.current.space;
  refreshChoices();
  checkAnswer(true);
});
els.newBtn.addEventListener("click", newProblem);

newProblem();
