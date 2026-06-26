/* ==========================================================================
   MindGauge — trivia-engine.js
   Motor genérico pra quizzes de pergunta-e-resposta com 1 alternativa
   correta. Reutilizado por: general-knowledge-quiz, english-dialect-quiz.
   ========================================================================== */

function MGTrivia(config) {
  // config = { questions:[{text,options:[],correct:i}], rootId, gaugeIds:{readout,needle}, onFinish(score,total) }
  var current = 0;
  var score = 0;
  var root = document.getElementById(config.rootId);

  function renderQuestion() {
    var q = config.questions[current];
    var html = '<div class="quiz-progress">QUESTION ' + (current + 1) + ' / ' + config.questions.length + '</div>';
    html += '<h3 class="quiz-question">' + q.text + '</h3>';
    html += '<div class="quiz-options" id="mgt-options">';
    q.options.forEach(function (opt, i) {
      html += '<button class="quiz-option" data-i="' + i + '">' + opt + '</button>';
    });
    html += '</div>';
    html += '<div class="tool-instructions" id="mgt-feedback" style="margin-top:12px;"></div>';
    root.innerHTML = html;

    var btns = root.querySelectorAll('.quiz-option');
    for (var b = 0; b < btns.length; b++) {
      btns[b].addEventListener('click', function (e) {
        var idx = parseInt(e.currentTarget.getAttribute('data-i'), 10);
        var allBtns = root.querySelectorAll('.quiz-option');
        for (var k = 0; k < allBtns.length; k++) { allBtns[k].disabled = true; }
        var fb = document.getElementById('mgt-feedback');
        if (idx === q.correct) {
          score++;
          e.currentTarget.style.borderColor = '#1FB6A6';
          fb.textContent = 'Correct!';
        } else {
          e.currentTarget.style.borderColor = '#FF5A36';
          fb.textContent = 'Not quite — the answer was "' + q.options[q.correct] + '".';
          allBtns[q.correct].style.borderColor = '#1FB6A6';
        }
        setTimeout(function () {
          current++;
          if (current < config.questions.length) {
            renderQuestion();
          } else {
            config.onFinish(score, config.questions.length);
          }
        }, 900);
      });
    }
  }

  renderQuestion();
}
