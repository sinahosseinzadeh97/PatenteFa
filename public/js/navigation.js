/**
 * Central Back policy for the Mini App.
 * Loaded before app.js so visible buttons and Telegram.WebApp.BackButton share
 * exactly the same destination rules.
 */
window.App = window.App || {};

(function(App) {
  'use strict';

  var ROOT_SCREENS = { home: true, signs: true, vocab: true, pending: true };
  var HOME_NESTED_SCREENS = {
    topics: true,
    stats: true,
    profile: true,
    admin: true,
    results: true,
  };

  App.resolveBackNavigation = function(currentScreen, context) {
    var state = context || {};

    if (!currentScreen || ROOT_SCREENS[currentScreen]) {
      return { kind: 'none' };
    }
    if (currentScreen === 'exam') {
      return { kind: 'exit-exam', target: state.examReturnScreen || 'home' };
    }
    if (currentScreen === 'support') {
      return { kind: 'close-support', target: state.supportFrom || 'home' };
    }
    if (currentScreen === 'tutor') {
      return { kind: 'screen', target: 'results' };
    }
    if (HOME_NESTED_SCREENS[currentScreen]) {
      return { kind: 'screen', target: 'home' };
    }

    return { kind: 'screen', target: 'home' };
  };
})(window.App);
