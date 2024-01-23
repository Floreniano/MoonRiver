import { mapDots } from './markers.js';

const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

$('.header_right-menu').click(() => {
  $('.navigation').addClass('show');
  $('body').addClass('hidden');
});
$('.close').click(() => {
  $('.navigation').removeClass('show');
  $('body').removeClass('hidden');
});

async function initMap() {
  await ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const map = new YMap(
    document.getElementById('map'),

    // Передаём параметры инициализации карты
    {
      location: {
        center: [37.62, 55.753842],
        zoom: 11,
      },
      behaviors: ['drag'],
    },
    [
      // Add a layer of geo objects to display the markers
      new YMapDefaultFeaturesLayer({}),
    ],
  );
  const layer = new YMapDefaultSchemeLayer({
    customization: [
      {
        tags: {
          any: ['road'],
        },
        elements: 'geometry',
        stylers: [
          {
            color: '#2b2b2b',
          },
        ],
      },
      {
        tags: {
          any: ['water'],
        },
        elements: 'geometry',
        stylers: [
          {
            color: '#3f3f3f',
          },
        ],
      },
      {
        tags: {
          any: ['landscape', 'land', 'transit', 'admin'],
        },
        elements: 'geometry',
        stylers: [
          {
            color: '#333333',
          },
        ],
      },

      {
        tags: {
          any: ['admin'],
        },
        elements: 'label.text.outline',
        stylers: [
          {
            color: '#282828',
          },
        ],
      },

      {
        tags: {
          any: ['admin'],
        },
        elements: 'label.text.fill',
        stylers: [
          {
            color: '#666666',
          },
        ],
      },

      {
        tags: {
          any: ['address'],
        },
        elements: 'label.text.fill',
        stylers: [
          {
            color: '#efc58b',
          },
        ],
      },

      {
        tags: {
          any: ['building'],
        },
        elements: 'geometry',
        stylers: [
          {
            color: '#3d3d3d',
          },
        ],
      },
    ],
  });

  mapDots.forEach((markerProp) => {
    const markerElement = document.createElement('div');
    markerElement.className = 'map-marker';
    markerElement.innerHTML = `
    <div class="map-marker-image"></div>
    <p class="map-marker-title">${markerProp.title}</p>
    `;
    map.addChild(new YMapMarker({ coordinates: markerProp.coordinates }, markerElement));
  });

  // Добавляем слой для отображения схематической карты
  map.addChild(layer);
}

initMap().then(() => {
  setTimeout(() => {
    $('.loader').addClass('hidden');
  }, 1000);
});
