
// $(function(){}) - запись позволяем дождаться загрузки файла с DOM эелементами HTML файл
$(function(){






   let worksSlider = $('[data-slider="slick"]')
   // filter===================================

   // $("[data-filter]")	All elements with a data-filter attribute (jquery)
   let filter= $("[data-filter]");//сохраняем в переменную  filter атрибуты тега навигации data-filter
// будем выполнять действие при клике
   filter.on("click", function(event) {
      event.preventDefault();// function(event) -отменяем настройки Default при клике

      let cat = $(this).data('filter');

      if(cat == 'all') {
         $('[data-cat]').removeClass('hide');
      } else {
         $("[data-cat]").each(function() {

         let workCat = $(this).data('cat');

         // цыкл если workCat не ровняеться cat добавляем класс hide
         if(workCat != cat){
             $(this).addClass('hide');
         } else {
            $(this).removeClass('hide');
         }
      });
      }
   });

   //Modal=========================

   let modalCall = $("[data-modal]")//сохраняем в переменную modalCall значение c атирибутом кнопок data-modal
   let modalClose = $("[data-close]")//для закрытия модальных окон
   //вызываем  модальное окно
   modalCall.on("click", function(event){
      event.preventDefault()

      let $this = $(this)//сохраняем в переменную кнопку по которой кликнули
      // получаем ID
      let modalId = $this.data('modal')

      //вызываем модальное окно+добавляем класс show
      $(modalId).addClass('show')
      //для того чтобы убрать скрол модального окна
      $("body").addClass('no-scroll')


      worksSlider.slick('setPosition')//позиционирование слайда
 });
   modalClose.on("click", function(event){
      event.preventDefault()

      let $this = $(this)//сохраняем в переменную кнопку по которой кликнули

      let modalParent = $this.parents('.modal')

      //вызываем модальное окно+добавляем класс show
      modalParent.removeClass('show')

      //возвращаем класс скрол модального окна при закрытии
      $("body").removeClass('no-scroll')
   });
//для закрытия модального окна при клике на пустую область----------

   //при клике на
   $(".modal").on("click", function(event){
      //вызываем модальное окно+добавляем класс show
      $(this).removeClass('show')
      //возвращаем класс скрол модального окна при закрытии
      $("body").removeClass('no-scroll')
   });

   // отменить клик по родителю
   $(".modal__dialog").on("click", function(event){
      // при клике на modal__dialog отменяем событие клика по его родителю
      event.stopPropagation()

   });



  worksSlider.slick({
      infinite: true,//бесконечная прокрутка
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: false,//убоать кнопки
      dots: true
});

   $(".slickPrev").on("click", function(event){
      event.preventDefault()

      let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]')

      currentSlider.slick("slickPrev")
   })

   $(".slickNext").on("click", function(event){
      event.preventDefault()
      let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]')

     currentSlider.slick("slickNext")
   })

// Mobile nav=============
   let navToggle = $("#navToggle")
   let nav = $("#nav")


   navToggle.on("click", function(event){
      event.preventDefault()
      // при клике добавляем класс "show"
      nav.toggleClass("show")
   })


   // header fixed==============================

   //записываем в переменную ID # header//обращение по класу через "."
   let header = $("#header")
   let intro = $("#intro")
   let introH = intro.innerHeight()
   let scrollPos = $(window).scrollTop()

   $(window).on("scroll load resize",  function(){

   introH = intro.innerHeight()//перезаписывать значение переменной при resize окна

   scrollPos = $(this).scrollTop()

   if(scrollPos > introH ){
      header.addClass("fixed")
   }else{
      header.removeClass("fixed")
   }

   })

    /** Smooth Scroll*/
    //https://www.youtube.com/watch?v=YH7wQURtZ9Q&list=PLoq3Accf02PVO4GvY4-UtIQkeD6tNmX_f&index=8

    //делаем выборку элемента с атрибутом data-scroll

   $("[data-scroll]").on("click", function(event){
      event.preventDefault()//отменяет стандартное поведение ссылки, например перезагрузку

      // получили id елемента
      let elementId = $(this).data('scroll')
      //получаем значение  отступа data-scroll от верха страницы через метод .offset()
      let elementOffset = $(elementId).offset().top


      //скролим страницу

      $("html, body").animate({
         scrollTop : elementOffset
      })

   })

   // langue translate===============================


   let arrLang = {
      'en': {
         'works'  : 'WORKS',
         'about'  : 'About me',
         'reviews': 'reviews',
         'hire'   : 'hire me',
         'name'   : 'vitaliy Kolesnik',
         'prof'   : 'Junior Front-End Developer',
         'hello'  : 'Hello I am',
         'resume' : 'Se my resume',
         'aboutMe': 'About me',
         'who'    :  'Who am I',
         'hi'    :  'Hi! My name is Vitaliy and I am open to new opportunities I want to find an interesting job. I have been working with Front End for a year now, constantly improving my skills gained at Infopulse University. It feels like I am ready for new challenges.I have experience working as part of a team and individually.I like to spend my free time on fishing, I am interested in active types of recreation.I would be glad to meet you!',

      },

      'ru': {
         'works'  : 'Проекты',
         'about'  : 'О Себе',
         'reviews': 'Отзывы',
         'hire'   : 'Нанять меня',
         'name'   : 'Виталий Колесник',
         'prof'   : 'Front-End разработчик',
         'hello'  : 'Привет, меня зовут',
         'resume' : 'Мое Резюме',
         'aboutMe': 'О Себе',
         'who'    :  'Кто я?',
         'hi'    :  'Меня зовут Виталий.Хочу найти интересную работу и я открыт для новых возможностей.С Front End работаю уже год, постоянно совершенствуя свои навыки, полученные в Университете Инфопульс. Имею опыт работы как в команде так  и индивидуально. Люблю проводить свободное время на рыбалке, интересуюсь активными видами отдыха.Буду рад познакомиться!',
      }
   }
   $(function(){
      $('.translate').click(function(){
         let lang = $(this).attr('id')

         $('.lang').each(function(index, nav){
            $(this).text(arrLang[lang][$(this).attr('key')])
         })
      })
   })


})