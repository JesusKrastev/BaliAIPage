// Verifica la prueba gratuita y las páginas principales contra el preview local.
const { chromium } = require('playwright');
const assert = require('assert/strict');
const path = require('path');
const questions = require('../data/test');
async function main() {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/_vercel/**', route => route.fulfill({ status: 204, body: '' }));
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/', '/test-dgt-gratis.html', '/blog/repasar-fallos-test-dgt.html', '/aprendizaje.html']) {
        await page.goto('http://127.0.0.1:4173' + route);
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(async () => {
          const images = [...document.images];
          images.forEach(img => img.loading = 'eager');
          await Promise.all(images.map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; })));
        });
        assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(img => !img.naturalWidth).map(img => img.src)), [], route + ': imagen no cargada');
        assert.equal(await page.locator('h1').count(), 1);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route + ': desbordamiento ' + width);
        if (process.env.QA_SCREENSHOTS && width !== 320) await page.screenshot({ path: path.join(process.env.QA_SCREENSHOTS, 'bali-' + (route === '/' ? 'home' : route.split('/').pop().replace('.html', '')) + '-' + width + '.png'), fullPage: true });
      }
    }
    await page.goto('http://127.0.0.1:4173/test-dgt-gratis.html');
    await page.locator('button[type=submit]').click();
    assert.equal(await page.locator('#practice-result').isVisible(), false, 'No corregir respuestas incompletas');
    for (const [index, question] of questions.entries()) await page.locator(`input[name=q${index}][value="${question.correcta}"]`).check();
    await page.locator('button[type=submit]').click();
    await page.waitForFunction(() => !document.getElementById('practice-result').hidden);
    assert.match(await page.locator('#practice-score').textContent(), /^10 de 10/);
    assert.equal(await page.locator('.is-correct').count(), 10);
    await page.locator('button[type=reset]').click();
    assert.equal(await page.locator('input:checked').count(), 0);
    assert.equal(await page.locator('#practice-result').isVisible(), false);
    assert.equal(await page.locator('.answer-feedback').count(), 0);
    for (const [index, question] of questions.entries()) await page.locator(`input[name=q${index}][value="${(question.correcta + 1) % question.opciones.length}"]`).check();
    await page.locator('button[type=submit]').click();
    assert.match(await page.locator('#practice-score').textContent(), /^0 de 10/);
    assert.equal(await page.locator('.is-wrong').count(), 10);
    assert.equal(await page.locator('details[open]').count(), 10);
    await page.locator('#hamburger').click();
    assert.equal(await page.locator('#hamburger').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#hamburger').getAttribute('aria-expanded'), 'false');
    assert.deepEqual(errors, []);
    const context = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await context.newPage();
    await staticPage.goto('http://127.0.0.1:4173/test-dgt-gratis.html');
    assert.equal(await staticPage.locator('fieldset').count(), 10);
    await staticPage.locator('summary').first().click();
    assert.equal(await staticPage.locator('details').first().getAttribute('open'), '');
    await staticPage.goto('http://127.0.0.1:4173/aprendizaje.html');
    assert.equal(await staticPage.locator('#bloquesGrid a').count(), 12);
    console.log('Interfaz verificada: 4 páginas a 3 anchos; mini test, reinicio, menú y contenido sin JavaScript.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
