const miniAnswers = new Set(["あり", "くつ", "みつ", "みき"]);
const finalAnswers = new Set(["くりあ", "クリア"]);

function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, ch =>
      String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
    )
    .replace(/[ァ-ン]/g, ch =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60)
    )
    .replace(/\s+/g, "");
}

function setResult(id, text, ok) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "result " + (ok ? "ok" : "ng");
}

function checkMiniAnswer() {
  const ans = normalize(document.getElementById("miniAnswer").value);

  if (miniAnswers.has(ans)) {
    setResult("miniResult", `【${ans}】正解！`, true);
  } else {
    setResult("miniResult", "違います。", false);
  }
}

function checkAnswer() {
  const input = document.getElementById("answer1");
  const result = document.getElementById("result1");

  if (!input || !result) {
    alert("answer1 または result1 が見つかりません");
    return;
  }

  const ans = normalize(input.value);

  if (ans === "くりあ" || ans === "クリア") {
    result.innerHTML = `
      <div class="clear-box">
        <div class="clear-title">CLEAR</div>
        <div class="clear-message">正解です。最後まで遊んでいただき、ありがとうございました。</div>
        <div class="thanks">THANK YOU FOR PLAYING</div>
      </div>
    `;
    result.className = "result ok";
  } else {
    result.textContent = "違います。";
    result.className = "result ng";
  }
}