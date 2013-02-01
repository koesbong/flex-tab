// TODO
//
// - Calculate ratio for <a> tag inside the tab on resize
// - Resize tabs on delete

$(function() {
  var tabTitle = $( "#tab_title" ),
      tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 2;

  var tabs = $( "#tabs" ).tabs();

  // modal dialog init: custom buttons and a "close" callback reseting the form inside
  var dialog = $( "#dialog" ).dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      Add: function() {
        addTab();
        $( this ).dialog( "close" );
      },
      Cancel: function() {
        $( this ).dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
    }
  });

  // addTab form: calls addTab function on submit and closes the dialog
  var form = dialog.find( "form" ).submit(function( event ) {
    addTab();
    dialog.dialog( "close" );
    event.preventDefault();
  });

  // actual addTab function: adds new tab using the input from the form above
  function addTab() {
    var label = tabTitle.val() || "Tab " + tabCounter,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

    tabs.find( ".ui-tabs-nav" ).append( li );
    tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
    tabs.tabs( "refresh" );
    tabCounter++;

    var $tabContainer = $("#tabs"),
      $tabs = $("#tabs li"),
      minWidth = 130,
      tabCount = $tabs.length,
      containerWidth = $tabContainer.width(),
      tabWidth = tabCount * minWidth,
      expectedWidth = (containerWidth - (2 * tabCount)) / tabCount,
      newWidth = containerWidth >= tabWidth ? minWidth : expectedWidth;

      //console.log(tabLength);
      //console.log(tabCount);
      //console.log(containerWidth);
      //console.log(tabWidth);
      //console.log(expectedWidth);
      console.log(newWidth);

    $.each( $tabs, function( index, tab ) {
      $(tab).css({
        'width' : newWidth + 'px'
      });

      if (newWidth < minWidth) {
        $(tab).find('a').css({
          'width': $('#tabs li:first-child a').width() * 0.8 + 'px'
        });
      }
    });
  }

  function foo() {

  }

  // addTab button: just opens the dialog
  $( "#add_tab" )
    .button()
    .click(function() {
        dialog.dialog( "open" );
    });

  // close icon: removing the tab on click
  tabs.delegate( "span.ui-icon-close", "click", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    tabs.tabs( "refresh" );
  });

  tabs.bind( "keyup", function( event ) {
    if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
      var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    }
  });
});