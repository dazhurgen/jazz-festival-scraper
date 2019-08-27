
const rp = require('request-promise');
const $ = require('cheerio');

module.exports = {
    scrapeJass : function(url){
        
        return new Promise((resolve, reject)=>{
            let gigs = [];
            rp(url).then(function(html) {
                    //get the list of all venues 
                  $('.ligne_jour', html).each(function(i, elem) {
                      //set the gig data object 
                    let gigData = {
                        date:$(this).find('.datesoiree').text(),
                        starts:$(this).find('.sallesoiree').text(),
                        price:$(this).find('.tarifsoiree').text(),
                        concerts:[]
                    }
                    //in this case get the first concert since the class is different
                    let concert1 = {
                        name:$(this).find('.concert1_jour').find('.titresoiree').text(),
                        img:$(this).find('.concert1_jour').find('img').attr('src'),
                    }
                    gigData.concerts.push(concert1);
                    //get all the remaining concerts
                    if($(this).find('.concert_jour').find('.titresoiree')[0] != 'undefined'){
                        $(this).find('.concert_jour').each(function(j,data){
                            let value = {
                                name:$(this).find('.titresoiree').text(),
                                img:$(this).find('img').attr('src')
                            };
                            gigData.concerts.push(value);
                        });
                    }
                   gigs.push(gigData);
                  });
                  resolve({gigs:gigs}); 
             
            }).catch(function(err) {
                //handle error
                reject(err);
                console.log(err);
            });
        }); 
    }
}