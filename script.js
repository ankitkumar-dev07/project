const buttons = document.querySelectorAll('.nav button');
const pages = document.querySelectorAll('.page');


// ================= NAVIGATION =================

buttons.forEach(b => {

  b.addEventListener('click', () => {

    buttons.forEach(x => {
      x.classList.remove('active');
    });

    b.classList.add('active');


    pages.forEach(p => {
      p.classList.remove('active');
    });


    document
      .getElementById('page-' + b.dataset.page)
      .classList.add('active');


    document
      .getElementById('sidebar')
      .classList.remove('open');


    window.scrollTo({
      top:0,
      behavior:'smooth'
    });

  });

});


// ================= MOBILE MENU =================

document
  .getElementById('menu')
  .addEventListener('click', () => {

    document
      .getElementById('sidebar')
      .classList.toggle('open');

  });


// ================= TOAST =================

function toast(msg){

  const t = document.getElementById('toast');

  t.textContent = msg;

  t.classList.add('show');

  clearTimeout(window.__t);

  window.__t = setTimeout(() => {

    t.classList.remove('show');

  },2200);

}


// ================= EMPLOYEE SEARCH =================

function filterEmployees(){

  const q =
    document
      .getElementById('empSearch')
      .value
      .toLowerCase();


  document
    .querySelectorAll('#empBody tr')
    .forEach(r => {

      r.style.display =
        r.textContent
          .toLowerCase()
          .includes(q)
          ? ''
          : 'none';

    });

}


// ================= GLOBAL SEARCH =================

document
  .getElementById('globalSearch')
  .addEventListener('keydown', e => {

    if(e.key === 'Enter'){

      const q =
        e.target.value.toLowerCase();


      if(q.includes('employee')){

        document
          .querySelector('[data-page="employees"]')
          .click();

      }

      else if(q.includes('payroll')){

        document
          .querySelector('[data-page="payroll"]')
          .click();

      }

      else if(q.includes('report')){

        document
          .querySelector('[data-page="reports"]')
          .click();

      }

      else if(q.includes('ai')){

        document
          .querySelector('[data-page="ai"]')
          .click();

      }

    }

  });