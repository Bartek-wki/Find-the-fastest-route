import { select, classNames } from './settings.js';
import drawRoutes from './components/drawRoutes.js';
import selectStartAndEnd from './components/selectStartAndEnd.js';
import compute from './components/compute.js';
import startAgain from './components/startAgain.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    
    const idfromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idfromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initDrawRoutes: function () {
    const thisApp = this;
    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.drawRoutes = new drawRoutes(finderWrapper);
  },

  initStartAndEnd: function () {
    const thisApp = this;

    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.selectStartAndEnd = new selectStartAndEnd(finderWrapper);
  },

  initCompute: function () {
    const thisApp = this;

    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.compute = new compute(finderWrapper);
  },

  initStartAgain: function () {
    const thisApp = this;

    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.startAgain = new startAgain(finderWrapper);
  },

  init: function () {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initDrawRoutes();
    thisApp.initStartAndEnd();
    thisApp.initCompute();
    thisApp.initStartAgain();

  }
};

app.init();