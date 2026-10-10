// Marcado compartido entre el blog y las tarjetas de portada.
function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function imagenHtml(post, basePath, hero) {
  if (!post.featureImage) return '';
  var image = post.featureImage;
  var stem = image.src.replace(/-feature\.webp$/, '');
  var src = hero ? image.src : stem + '-480.webp';
  var cardHeight = Math.round(image.height * 480 / image.width);
  var srcset = [480, 960].map(function (size) {
    return basePath + stem + '-' + size + '.webp ' + size + 'w';
  }).concat(basePath + image.src + ' ' + image.width + 'w').join(', ');
  return '<img class="' + (hero ? 'blog-feature-image' : 'blog-card-image') + '" src="' + esc(basePath + src) + '" srcset="' + esc(srcset) + '" sizes="' + (hero ? '(max-width: 768px) calc(100vw - 48px), 860px' : '(max-width: 768px) calc(100vw - 48px), (max-width: 1024px) 45vw, 360px') + '" width="' + (hero ? image.width : 480) + '" height="' + (hero ? image.height : cardHeight) + '" alt="' + esc(image.alt) + '" loading="' + (hero ? 'eager' : 'lazy') + '"' + (hero ? ' fetchpriority="high"' : ' decoding="async"') + '>';
}
module.exports = imagenHtml;
