
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
                        id:$(this).attr('id'),
                        date:$(this).find('.datesoiree').text(),
                        starts:$(this).find('.sallesoiree').text(),
                        price:$(this).find('.tarifsoiree').text(),
                        concerts:[]
                    }
                    //in this case get the first concert since the class is different
                    let concert1 = {
                        bandName:$(this).find('.concert1_jour').find('.titresoiree').text(),
                        img:'http://www.jazzinmarciac.co.uk/'+$(this).find('.concert1_jour').find('img').attr('src'),
                        members:''
                    }
                    let objectId = $(this).attr('id');
                    concert1.singers = objectId;
                    gigData.concerts.push(concert1);
                    //get all the remaining concerts
                    if($(this).find('.concert_jour').find('.titresoiree')[0] != 'undefined'){
                        $(this).find('.concert_jour').each(function(j,data){
                            let value = {
                                bandName:$(this).find('.titresoiree').text(),
                                img:'http://www.jazzinmarciac.co.uk/'+$(this).find('img').attr('src'),
                                members:''
                            };
                            gigData.concerts.push(value);
                        });
                    }
                   //gigs.push(gigData);
                   var nameAtt = objectId.replace('test','');
                   $('.ligne_detail2_jour', html).each(function(i, elem) {
                         if($(this).parent().attr('name') == nameAtt){
                             let counter = 0;
                             $(this).find('.textemusicos').each(function(x, musicians){
                                gigData.concerts[counter].members = $(this).text();
                                counter ++;
                             })
                             
                            
                         }
                   })
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