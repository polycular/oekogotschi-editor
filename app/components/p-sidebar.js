import Ember from 'ember'

export default Ember.Component.extend({
  classNames: ['sidebar'],

  didInsertElement() {
    const $ = Ember.$

    // Sidebar categories
    this.$('.category-title [data-action=reload]')
      .on('click', function(e) {
        e.preventDefault()
        const $block = $(this).parent().parent().parent().parent()
        $block
          .block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
              backgroundColor: '#000',
              opacity: 0.5,
              cursor: 'wait',
              'box-shadow': '0 0 0 1px #000'
            },
            css: {
              border: 0,
              padding: 0,
              backgroundColor: 'none',
              color: '#fff'
            }
          })
      })

    // Hide if collapsed by default
    this.$('.category-collapsed')
      .children('.category-content')
      .hide()

    // Rotate icon if collapsed by default
    this.$('.category-collapsed')
      .find('[data-action=collapse]')
      .addClass('rotate-180')

    // Collapse on click
    this.$('.category-title [data-action=collapse]')
      .on('click', function(e) {
        e.preventDefault()
        const $categoryCollapse = $(this).parent().parent().parent().nextAll()
        $(this).parents('.category-title').toggleClass('category-collapsed')
        $(this).toggleClass('rotate-180')

        containerHeight() // adjust page height

        $categoryCollapse.slideToggle(150)
      })

    this.$('.category-title [data-action=close]').click(function(e) {
      e.preventDefault()
      const $categoryClose = $(this).parent().parent().parent().parent()

      containerHeight() // recalculate page height

      $categoryClose
        .slideUp(150, function() {
          $(this).remove()
        })
    })

    // Main navigation
    // -------------------------

    // Add 'active' class to parent list item in all levels
    this.$('.navigation')
      .find('li.active')
      .parents('li')
      .addClass('active')

    // Hide all nested lists
    this.$('.navigation')
      .find('li')
      .not('.active, .category-title')
      .has('ul').children('ul')
      .addClass('hidden-ul')

    // Highlight children links
    this.$('.navigation')
      .find('li')
      .has('ul')
      .children('a')
      .addClass('has-ul')

    // Add active state to all dropdown parent levels
    this.$('.dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu').has('li.active').addClass('active').parents('.navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)')
      .addClass('active')

    // Collapsible functionality
    // -------------------------

    // Main navigation
    this.$('.navigation-main')
      .find('li')
      .not(':has(.has-ul)')
      .on('click', function() {
        $(this)
          .siblings('.active')
          .removeClass('active')
          .children('ul')
          .slideUp(250)
      })

    this.$('.navigation-main')
      .find('li')
      .has('ul')
      .children('a')
      .on('click', function() {
        const $sidebarXS = $('.sidebar-xs')

        // Collapsible
        $(this)
          .parent('li')
          .not('.disabled')
          .not($sidebarXS
            .not('.sidebar-xs-indicator')
            .find('.navigation-main')
            .children('li'))
          .toggleClass('active')
          .children('ul')
          .slideToggle(250)

        // Accordion
        if ($('.navigation-main').hasClass('navigation-accordion')) {
          $(this)
            .parent('li')
            .not('.disabled')
            .not($sidebarXS
              .not('.sidebar-xs-indicator')
              .find('.navigation-main')
              .children('li'))
            .siblings(':has(.has-ul)')
            .removeClass('active')
            .children('ul')
            .slideUp(250)
        }
      })

    function containerHeight() {
      const $pageContainer = $('.page-container')
      const availableHeight = $(window).height() - $pageContainer.offset().top - $('.navbar-fixed-bottom').outerHeight()

      $pageContainer.attr('style', 'min-height:' + availableHeight + 'px')
    }

    $(window).on('resize', containerHeight)

    // Initialize
    containerHeight()

  }
})
