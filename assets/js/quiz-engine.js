/* ==========================================================================
   MindGauge — quiz-engine.js
   Motor genérico pra quizzes de múltiplas perguntas que somam pontos por
   categoria e mostram a categoria "vencedora" + barras de comparação.
   Reutilizado por: personality-type-quiz, brain-dominance-test, e qualquer
   quiz futuro do mesmo padrão (love-language, career-aptitude, etc).
   ========================================================================== */

function MGQuiz(config) {
  // config = { questions, results, rootId, onComplete(scores) }
  var current = 0;
  var scores = {};
  Object.keys(config.results).forEach(function (k) { scores[k] = 0; });
  var root = document.getElementById(config.rootId);

  function renderQuestion() {
    var q = config.questions[current];
    var html = '<div class="quiz-progress">QUESTION ' + (current + 1) + ' / ' + config.questions.length + '</div>';
    html += '<h3 class="quiz-question">' + q.text + '</h3>';
    html += '<div class="quiz-options">';
    q.options.forEach(function (opt, i) {
      html += '<button class="quiz-option" data-i="' + i + '">' + opt.label + '</button>';
    });
    html += '</div>';
    root.innerHTML = html;

    var btns = root.querySelectorAll('.quiz-option');
    for (var b = 0; b < btns.length; b++) {
      btns[b].addEventListener('click', function (e) {
        var idx = parseInt(e.currentTarget.getAttribute('data-i'), 10);
        var opt = q.options[idx];
        Object.keys(opt.scores || {}).forEach(function (k) {
          scores[k] = (scores[k] || 0) + opt.scores[k];
        });
        current++;
        if (current < config.questions.length) {
          renderQuestion();
        } else {
          config.onComplete(scores);
        }
      });
    }
  }

  renderQuestion();
}

// Renderiza o bloco de resultado padrão (headline + barras) dentro de um
// elemento. Usado depois que MGQuiz termina.
function renderMGQuizResult(targetId, scores, resultsMeta) {
  var keys = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
  var top = keys[0];
  var max = Math.max.apply(null, keys.map(function (k) { return scores[k]; })) || 1;

  var html = '<p class="eyebrow">Your result</p>';
  html += '<h3 class="result-headline">' + resultsMeta[top].name + '</h3>';
  html += '<p>' + resultsMeta[top].desc + '</p>';
  html += '<div class="result-bars">';
  keys.forEach(function (k) {
    var pct = Math.round((scores[k] / max) * 100);
    html += '<div class="bar-row' + (k === top ? ' top' : '') + '">';
    html += '<div class="bar-label"><span>' + resultsMeta[k].name + '</span><span>' + scores[k] + ' pts</span></div>';
    html += '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div>';
    html += '</div>';
  });
  html += '</div>';

  document.getElementById(targetId).innerHTML = html;
}
