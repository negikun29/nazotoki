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
    setResult("miniResult", "正解です。", true);
  } else {
    setResult("miniResult", "違います。", false);
  }
}

function checkAnswer() {
  const ans = normalize(document.getElementById("answer1").value);

  if (finalAnswers.has(ans)) {
    setResult("result1", "正解!!", true);
  } else {
    setResult("result1", "違います。", false);
  }
}