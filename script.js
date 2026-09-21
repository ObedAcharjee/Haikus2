/* ==========================================================================
   Haikus — gallery renderer

   The gallery is now built from the HAIKUS array in haikus-data.js instead
   of being hand-written HTML. To add a haiku, add an object to that array:

     { id: "unique-id", title: "Title", image: "url-or-filename.jpg",
       lines: ["line one", "line two", "line three"] }

   and reload — no need to touch this file or index.html. This is also what
   a future "write a haiku" button will call under the hood (see
   addHaiku() at the bottom).
   ========================================================================== */

const downloadIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>`;

function buildHaikuCard(haiku) {
  const card = document.createElement('div');
  card.className = 'haiku-card';
  card.dataset.id = haiku.id;

  const h2 = document.createElement('h2');
  h2.textContent = haiku.title;

  // Cards with an `altTitle` toggle their heading text on click
  // (this is how the original "Twilight Bonds" / "✨Shylla✨" easter egg works).
  if (haiku.altTitle) {
    h2.style.cursor = 'pointer';
    h2.addEventListener('click', () => toggleTitle(h2, haiku.title, haiku.altTitle));
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';

  const img = document.createElement('img');
  img.src = haiku.image;
  img.alt = `${haiku.title} haiku`;
  img.className = 'haiku-img';

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'download-btn';
  downloadBtn.dataset.title = haiku.title;
  downloadBtn.innerHTML = downloadIconSVG;
  downloadBtn.addEventListener('click', () => downloadHaikuCard(downloadBtn, card));

  imageContainer.appendChild(img);
  imageContainer.appendChild(downloadBtn);

  const caption = document.createElement('p');
  caption.className = 'haiku-caption';
  haiku.lines.forEach((line, i) => {
    caption.appendChild(document.createTextNode(line));
    if (i < haiku.lines.length - 1) caption.appendChild(document.createElement('br'));
  });

  card.appendChild(h2);
  card.appendChild(imageContainer);
  card.appendChild(caption);
  return card;
}

function renderGallery(haikus) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  haikus.forEach(haiku => gallery.appendChild(buildHaikuCard(haiku)));
}

function toggleTitle(h2, title, altTitle) {
  h2.classList.add('fade-out');

  setTimeout(() => {
    if (h2.textContent === title) {
      h2.textContent = altTitle;
      h2.classList.add('sparkle');
    } else {
      h2.textContent = title;
      h2.classList.remove('sparkle');
    }
    h2.classList.remove('fade-out');
    h2.classList.add('fade-in');
  }, 800);

  setTimeout(() => {
    h2.classList.remove('fade-in');
  }, 1600);
}

function downloadHaikuCard(button, haikuCard) {
  const title = button.getAttribute('data-title');
  const spinner = document.getElementById('loading-spinner');

  spinner.style.display = 'flex';
  button.style.opacity = '0';

  domtoimage.toPng(haikuCard, {
    quality: 1.0,
    scale: 2,
    bgcolor: 'rgba(20, 20, 20, 0.85)',
    style: {
      'transform': 'none',
      'border-color': 'rgba(255,255,255,0.1)'
    },
    filter: (node) => node.tagName !== 'BUTTON'
  })
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = `haiku-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      spinner.style.display = 'none';
      button.style.opacity = '';
    })
    .catch(function (error) {
      console.error('Error generating image:', error);
      html2canvas(haikuCard, {
        backgroundColor: 'rgba(20, 20, 20, 0.85)',
        scale: 2,
        logging: false,
        useCORS: true,
        onclone: function (clonedDoc) {
          const clonedButton = clonedDoc.querySelector('.download-btn');
          if (clonedButton) clonedButton.style.display = 'none';
        }
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `haiku-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        spinner.style.display = 'none';
        button.style.opacity = '';
      });
    });
}

/* --------------------------------------------------------------------------
   Ready for the "write a haiku" button: call this with a new haiku object
   and it will be added to the data and rendered immediately, no reload
   needed. Wire a button up to it once you're ready to build that feature.
   -------------------------------------------------------------------------- */
function addHaiku(haiku) {
  if (!haiku.id) {
    haiku.id = haiku.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  HAIKUS.push(haiku);
  document.getElementById('gallery').appendChild(buildHaikuCard(haiku));
}

document.addEventListener('DOMContentLoaded', function () {
  renderGallery(HAIKUS);
});
