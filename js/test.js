(function () {
  'use strict';
  var form = document.getElementById('practice-form');
  if (!form) return;
  var questions = JSON.parse(document.getElementById('practice-data').textContent);
  var result = document.getElementById('practice-result');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var score = 0;
    questions.forEach(function (question, index) {
      var selected = form.querySelector('input[name="q' + index + '"]:checked');
      var correct = selected && Number(selected.value) === question.correcta;
      if (correct) score++;
      var field = document.getElementById('question-' + index);
      field.classList.toggle('is-correct', !!correct);
      field.classList.toggle('is-wrong', !correct);
      field.querySelector('details').open = true;
      var feedback = field.querySelector('.answer-feedback');
      if (!feedback) { feedback = document.createElement('p'); feedback.className = 'answer-feedback'; field.appendChild(feedback); }
      feedback.textContent = correct ? 'Respuesta correcta' : 'Respuesta incorrecta. Revisa la explicación.';
    });
    document.getElementById('practice-score').textContent = score + ' de ' + questions.length + ' respuestas correctas. Este es un ejercicio de práctica, no una nota de examen.';
    result.hidden = false;
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  form.addEventListener('reset', function () {
    result.hidden = true;
    form.querySelectorAll('fieldset').forEach(function (field) {
      field.classList.remove('is-correct', 'is-wrong');
      field.querySelector('details').open = false;
      var feedback = field.querySelector('.answer-feedback');
      if (feedback) feedback.remove();
    });
  });
})();
