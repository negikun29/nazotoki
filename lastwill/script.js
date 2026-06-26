const firstAnswers = new Set(["いま", "今", "イマ", "ima", "now"]);
const secondAnswers = new Set(["future", "みらい", "未来"]);

function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/\s+/g, "");
}

function show(id) {
  document.getElementById(id).classList.remove("hidden");
}

function setResult(id, text, ok) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "result " + (ok ? "ok" : "ng");
}

function checkFirst() {
  const raw = document.getElementById("answer1").value;
  const ans = normalize(raw);

  if (firstAnswers.has(ans) || raw.trim() === "今") {
    setResult("result1", "正解です。なつみへ答えを伝えました。", true);
    show("afterFirst");
    show("stage2");
    document.getElementById("afterFirst").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (!ans) {
    setResult("result1", "答えを入力してください。", false);
  } else {
    setResult("result1", "違うようです。もう一度考えてみてください。", false);
  }
}

function checkSecond() {
  const raw = document.getElementById("answer2").value;
  const ans = normalize(raw);

  if (secondAnswers.has(ans) || raw.trim() === "未来") {
    setResult("result2", "正解です。箱が開きました。", true);
    show("ending");
    document.getElementById("ending").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (!ans) {
    setResult("result2", "答えを入力してください。", false);
  } else {
    setResult("result2", "開きませんでした。もう一度確認してみてください。", false);
  }
}

document.getElementById("check1").addEventListener("click", checkFirst);
document.getElementById("check2").addEventListener("click", checkSecond);

document.getElementById("answer1").addEventListener("keydown", e => {
  if (e.key === "Enter") checkFirst();
});

document.getElementById("answer2").addEventListener("keydown", e => {
  if (e.key === "Enter") checkSecond();
});


const readLetterButton = document.getElementById("readLetter");
const letterContent = document.getElementById("letterContent");
const endTitle = document.getElementById("endTitle");
const orgelAudio = document.getElementById("orgelAudio");

if (readLetterButton) {
  readLetterButton.addEventListener("click", async () => {
    letterContent.classList.remove("hidden");
    endTitle.classList.remove("hidden");
    readLetterButton.style.display = "none";

    if (orgelAudio) {
      try {
        orgelAudio.volume = 0.05;
        await orgelAudio.play();
      } catch (error) {
      }
    }

    letterContent.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
