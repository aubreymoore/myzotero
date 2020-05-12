/**
 * Display the thesaurus terms on an article or asset page
 * @param {string}  selectedDomain  Which browse tab should this link to?
 * @param {string}  type            Is it an article or an asset?
 * @param {integer} versionId       The version id
 */
F1000.ThesaurusTermsDisplay = function(selectedDomain, type, versionId) {
  // external necessities
  this.Globals = F1000.Globals;

  this.selectedDomain = selectedDomain;
  this.type = type;
  this.versionId = versionId;

  this.termsContainer = 'js-terms-container';
  this.termsList = 'js-terms-list';

  this.fetchTerms();
};

F1000.ThesaurusTermsDisplay.prototype = {
  /**
   * Fetch the terms for the specified version via an API call
   */
  fetchTerms: function() {
    var thisObj = this,
      url = '/thesaurus/truncatedTerms/' + ((this.type === 'article') ? 'version' : this.type) + '/' + this.versionId;

    if (this.versionId === undefined) {
      return;
    }

    $.ajax({
      url: url
    })
    .done(function(data) {
      if (data.length === 0) {
        thisObj.hideTerms();
      } else {
        thisObj.constructList(data);
      }
    })
    .fail(function() {
      console.log('Error fetching terms');
    });
  },

  /**
   * Hide the term containers
   */
  hideTerms: function() {
    var thisObj = this,
      containers = document.querySelectorAll('.' + this.termsContainer);

    [].forEach.call(containers, function(container) {
      container.classList.add(thisObj.Globals.Classes.HIDDEN);
      container.classList.add('u-hidden');
    });
  },

  /**
   * Construct the list of terms
   * @param {object} terms  JSON object containing all of the associated terms
   */
  constructList: function(terms) {
    var thisObj = this,
      lists = document.querySelectorAll('.' + this.termsList),
      listItems = document.createDocumentFragment();

    terms.forEach(function(term) {
      listItems.appendChild(thisObj.constructListItem(term));
    });

    [].forEach.call(lists, function(list) {
      list.classList.add('article-subcontainer__list');
      list.appendChild(listItems.cloneNode(true));
    });
  },

  /**
   * Construct a list item
   * @param  {object} term  JSON object containing a single term
   * @return {Node}         HTML list item containing a link
   */
  constructListItem: function(term) {
    var listItem = document.createElement('li');

    listItem.classList.add('article-subcontainer__item')
    listItem.appendChild(this.constructLink(term));

    return listItem;
  },

  /**
   * Construct a link
   * @param  {object} term  JSON object containing a single term
   * @return {Node}         HTML link item
   */
  constructLink: function(term) {
    var link = document.createElement('a');

    link.href = '/browse/' + this.selectedDomain + '?v0=' + encodeURIComponent(term.termName.trim()) + '&n0=thesaurusTermsNamesLowerCased&o0=&selectedDomain=' + this.selectedDomain;
    link.innerText = term.termName.trim();
    link.classList.add('article-subcontainer__link');

    return link;
  }
};