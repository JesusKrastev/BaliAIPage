const bloques = require('./aprendizaje');
// Selección corta: no representa un examen oficial ni estima un aprobado.
const señales = bloques.find(b => b.id === 'senales-verticales');
const cruces = bloques.find(b => b.id === 'intersecciones');
const questions = [...señales.quiz.filter((q, i) => i !== 4).map(q => ({ ...q, topic: 'senales-verticales' })), ...cruces.quiz.slice(0, 5).map(q => ({ ...q, topic: 'intersecciones' }))];
questions[0] = { ...questions[0], pregunta: '¿Cuál es la forma habitual de las señales de advertencia de peligro?' };
questions[5 + 2] = { ...questions[5 + 2], pregunta: 'En un cruce sin señalizar entre vías de igual prioridad, sin excepciones, ¿a quién debes ceder el paso?', explicacion: 'Como norma general, cede a los vehículos que se aproximan por tu derecha. Revisa las excepciones en el bloque de intersecciones.' };
module.exports = questions;
