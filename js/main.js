var siteDataArray;

var getAllTagsFromSiteData= function() {
  var result = _.reduce(siteDataArray, function(result, siteData) {
                                  if(siteData.tags) {
                                    var tags = (typeof siteData.tags == "string" )?
                                              siteData.tags.split(",") :
                                              siteData.tags;
                                    result = result.concat(tags);
                                  }
                                  return result;
                                }, []);

    //Trim
    result = _.map(result, function(value) {
      return _.trim(value);
    });

    return _.uniq(result);
};

var buildLinks = function(linksData, siteCardElement) {
  $('#links', siteCardElement).empty();
  for(var i=0; i<linksData.length;i++) {
    if(typeof linksData[i] === 'string') {
      $('#links', siteCardElement).append("<li><a target='_blank' href='"+linksData[i]+"'>"+linksData[i]+"</a></li>");
    } else {
      $('#links', siteCardElement).append("<li><a target='_blank' href='"+linksData[i].url+"'>"+linksData[i].label+"</a></li>");
    }
  }
};

var buildSiteCardElement = function(siteData) {
    var sitecardHtml = $('#site-card').text();
    var siteCardElement = $(sitecardHtml);
    $('#title', siteCardElement).html("<a href='src/"+siteData.folder+"' target='_blank'>"+siteData.title+"</a>");
    $('#description', siteCardElement).html(siteData.description);
    buildLinks(siteData.links , siteCardElement);
    return siteCardElement[0];
};

var setHeadTitle = function(text) {
  $('.head-title').html(text);
};

var addSiteCardsToMainContent = function(siteCardArray){
  //loop result and added to central list with cool transitions
  // debugger;


  var resultObjs = [];
  var aux;
  for(var i=0;i<siteCardArray.length;i++) {
    aux = buildSiteCardElement(siteCardArray[i]);
    console.log("addSiteCardsToMainContent aux" , aux);

    resultObjs[i] = aux;
  }


  for(var i=0;i<resultObjs.length;i++) {
    $('.sitelist').append(resultObjs[i]);
  }

  setTimeout(function() {
    $('.sample-card').addClass('show');
  } , 10);

};

var showSitesByTag = function(tag, target) {

  $('nav ul a').removeClass('selected');
  $(target).addClass('selected');

  $('.sitelist').empty();

  console.log("showSitesByTag tag" , tag);

  //TODO filter samples by tag
  var filteredResults = _.filter(siteDataArray, function(siteData) {
    return siteData.tags.indexOf(tag) !== -1;
  });

  setHeadTitle(tag);
  addSiteCardsToMainContent(filteredResults);


};

//Get last three projects added to display them initially
var showHighlightedSites = function() {
  $('nav ul a').removeClass('selected');

  $('.sitelist').empty();


  function compare(a,b) {
    console.log("compare" , a.lastUpdateTimestamp ,b.lastUpdateTimestamp);
    if (a.lastUpdateTimestamp > b.lastUpdateTimestamp)
      return -1;
    if (a.lastUpdateTimestamp < b.lastUpdateTimestamp)
      return 1;
    return 0;
  }

  var siteDataArraySorted = siteDataArray.sort(compare);
  console.log("siteDataArraySorted" , siteDataArraySorted);

  var highlightedSites = siteDataArraySorted.slice(0, 3);

  console.log("highlightedSites" , highlightedSites);


  setHeadTitle("Last projects added");
  addSiteCardsToMainContent(highlightedSites);
};

//read catalog.json
$.ajax({
  method: "GET",
  url: "catalog.json",
  dataType: "json"
}).done(function(data) {
  siteDataArray=data;
  console.log("siteDataArray-->" , siteDataArray);

  //append all tags as left menu options
  var getAllTags = getAllTagsFromSiteData();
  console.log("getAllTags -->" , getAllTags);
  var leftMenuDomObj = $('nav ul');
  leftMenuDomObj.empty();
  _.forEach(getAllTags , function(tag) {
    leftMenuDomObj.append('<li><a href="#" onclick="showSitesByTag(\''+tag+'\', this)">'+tag+'</a></li>');
  });

  showHighlightedSites();

  $('.overlay').hide();
});
