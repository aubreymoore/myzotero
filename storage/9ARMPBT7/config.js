/* eslint-disable spaced-comment */
(function() {
  var confiantGlobal = window.confiant || (window.confiant = {});

  var integrationSetting = {
    config_ver: '202003230052',
    integration_type: 'gpt_and_prebid_v3l',
    prebid_integration_version: confiantGlobal.prebid_integration_version || '202003181643',
    gpt_integration_version: confiantGlobal.gpt_integration_version || '202003181643',
    c_integration_version: confiantGlobal.c_integration_version || '202003181643',
    cdt_version: '202003171135',
    exec_test_ver: null,
  };
  function defaultCallback() {
    console.log('Confiant: ad blocked', arguments);
  };
  var settings = {
    propertyId: 'r5TdgVvkbv-PeaJCKaQfCh5Xsto',
    adServer: 'https://protected-by.clarium.io',
    confiantCdn: 'https://clarium.global.ssl.fastly.net',
    confiant_cdn_v3: 'confiant-integrations.global.ssl.fastly.net',
    mapping: 'W3siaSI6MjQsInQiOiJ7e2suaGJfYXBfaWR9fTp7e3d9fXh7e2h9fSIsInAiOjUwLCJEIjowLCJyIjpbeyJ0IjoicmVnZXgiLCJzIjoidGFnIiwidiI6IlwvcGJqcy5yZW5kZXJBZFwvIn1dfSx7ImkiOjIsInQiOiJ7e299fTp7e3d9fXh7e2h9fSIsInAiOjAsIkQiOjEsInIiOltdfSx7ImkiOjYsInQiOiJ7e2NvfX06e3t3fX14e3tofX0iLCJwIjo1MCwiRCI6MCwiciI6W3sidCI6ImV4IiwicyI6bnVsbCwidiI6ImNvIn1dfV0=',
    activation: '|||MjE1MjU5NDI4Nw==,|||MjE1NDYyNzI3Nw==,|||MjE1NDg2ODczOA==,|||MjE1NDkxMDUyMQ==,|||MjE1NDkzODgxOQ==,|||MjE1NDkzOTAxNQ==,|||MjE1NDk1MTMxNw==,|||MjE1NDk1ODk0Ng==,|||MjE1NTU3MDk3OQ==,|||MjMzOTQ5OTI1NA==,|||MjMzOTg3ODQ4Mw==,|||MjE5NzEzNDY3Mw==,|||MjM1ODA4NzI0Mw==,|||MjM1ODA3NzIxMQ==,|||MjM1ODA2NjY2MA==,|||MjM1ODA0NTU0MA==,|||MjM1Nzc3MTUwMA==,|||MjM1Nzc2Mzk5MQ==,|||MjM1Nzc1ODI0Ng==,|||MjM1Nzc1NTg0OQ==,|||MjM1Nzc1MDgyMQ==,|||MjM1Nzc0NjUxMA==,|||MjM1Nzc0MjkwMQ==,|||MjM1NzczOTAwMQ==,|||MjM1NzM2ODIzNQ==,|||MjM1NzM2MzQ5NQ==,|||MjM1NzM1NDMwMw==,|||MjM1NzM1MjQ0Ng==,|||MjE1MjUyNDE0OQ==,|||MjE1MzI2MjIyNw==,|||MjI4NDQwODIyNg==,|||MjE1MjUyMzkwMA==,|||MjE1MzI4NTI1OQ==,|||MjE2MTk2ODEzOA==,|||MjExMTg4ODU0OA==,|||MjExMTkzNTQyMg==,|||MjE1MjU0OTYyNw==,|||MjE1MzI4MzM0OA==,|||MjE1NDkwMzM1Nw==,|||MjExMTg5MzA4MQ==,|||MjExMTkzNzA0NQ==,|||MjE1MjU5MjYzMQ==,|||MjE1MjU5MzI4NQ==,|||MjE1MzE4ODcxNw==,|||MjE1MjUyOTY2NQ==,|||MjE1MzI4NDA2Mg==,|||MjE1MjU5NTcyMQ==,|||MjE1MjU0OTg3MA==,|||MjE1MzI2MDc2OQ==,|||MjE1MjUyMzk2Ng==,|||MjE1MzI4NTY5MQ==,|||MjI1Njk4NzMyNw==,|||MjE1MjUyODk3Mg==,|||MjE1MzI2MTcyMA==,|||MjE1MjU5NDc5MQ==,|||MjE1MjYxNjExMg==,|||MjE1MzI1OTU3NQ==,|||MjI2MDQyMjM2MQ==,|||MjI2MTM0OTAzOQ==,|||MjI5MzE3NzE5OQ==,|||MjI5MzYyMDIzNA==,|||MjE1NDY1NjU4NQ==,|||MjE1NDYwNTg5Ng==,|||MjE1MjU5MTg4Ng==,|co|ex|MQ==,|||MjQxOTcyMjY1MA==,|||MjQyMDI0ODczMQ==,|||MjM2ODI3Njk1Mg==,|||MjQzODM5ODUyNQ==,|||MjQyNTUzODUzMQ==,|||MjQyNTczODAwOQ==,|||MjM3OTE3ODI1MA==,|||MjM3OTY0NDEzNw==,|||MjE4MTI1MTk4Mg==,|||MjQxNTQyNTkyOQ==,|||MjQxNTQ3OTkwMQ==,|||MjQyNjgwNzQwOQ==,|||MjQyNjgzNjI4NA==,|||MjExMTg3MDM5Mg==,|||MjE1NjUzNzE2Ng==,|||MjQwNDc5MjcxMg==,|||MjQwNTc1MDc2NA==,|||MjI5MzI2NzU5Mg==,|||MjI5MzM1NTkyNg==,|||MjQxNTAxMDUzNg==,|||MjQyMTQ4NjIwMA==,|||MjQyMjM1ODMxNQ==,|||MjQyNjEzMjA3Mw==,|||MjQzOTAzMDg1NQ==,|||MjQyODA5MzYxOQ==,|||MjQ0NzMzMjAwNA==,|||MjQ0NzM0NDc2Mw==,|||MjU3MTQ3MDYxOA==,|||MjU5Mzk3Nzc1Ng==,|||MjU5MzQ1NzQxMw==,|||MjU5Mzk3OTE4Nw==',
    prebidExcludeBidders: confiantGlobal.prebidExcludeBidders || [], //prebid bidder exclusion list
    sandbox: confiantGlobal.sandbox || '0',
    prebidNameSpace: confiantGlobal.prebidNameSpace || 'pbjs',
    callback: confiantGlobal.callback || defaultCallback,
    isMaster: true,
    devMode: confiantGlobal.devMode,
    enable_integrations: confiantGlobal.enable_integrations || 'prebid:false,gpt:true',
    isAR: confiantGlobal.isAR || 'false' === 'true',
    isCDT: 'true' === 'true',
    isPerf: 'undefined' === 'true',
    isIntegrationEnabled: isIntegrationEnabled,
  };
  var scriptId = !!confiantGlobal.settings ? settings.propertyId : null;
  var propertySettings = scriptId ? confiantGlobal[scriptId] || (confiantGlobal[scriptId] = {}) : confiantGlobal;

  propertySettings.settings = settings;
  propertySettings.settings['gpt_and_prebid_v3l'] = integrationSetting;
  function injectScript(path) {
    var e = document.createElement('script');
    if (scriptId) {
      e.id = scriptId;
    }
    e.async = true;
    e.src = path;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);
  }
  var shouldAddAllIntegerations = propertySettings.settings.propertyId === 'test_account';

  function isIntegrationEnabled(type) {
    var integrations = propertySettings.settings.enable_integrations;
    var checkType = Array.isArray(integrations) ? type : type + ':true';
    return shouldAddAllIntegerations || (integrations && integrations.indexOf(checkType) > -1);
  }
  if (isIntegrationEnabled('gpt')) {
    injectScript('//' + [propertySettings.settings.confiant_cdn_v3, 'gpt_v3l', (integrationSetting.exec_test_ver ? integrationSetting.exec_test_ver : integrationSetting.gpt_integration_version), 'wrap.js'].join('/'));
  }
  if (isIntegrationEnabled('prebid')) {
    injectScript('//' + [propertySettings.settings.confiant_cdn_v3, 'prebid_v3l', (integrationSetting.exec_test_ver ? integrationSetting.exec_test_ver : integrationSetting.prebid_integration_version), 'wrap.js'].join('/'));
  }

  var isCmpSupported = false;
  if (settings.devMode === 0 || settings.devMode === 2 || (isCmpSupported && Math.random() <= 0.1)) {
    injectScript('//' + [propertySettings.settings.confiant_cdn_v3, 'c', integrationSetting.c_integration_version, 'wrap.js'].join('/'));
  }

  if (!isIntegrationEnabled('gpt') && !isIntegrationEnabled('prebid')) {
    console.warn('Confiant', 'Current configuration is set not to monitor, please contact support@confiant.com');
  }
})();
