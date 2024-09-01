
function checker(appid,BR,i){
    url='https://steamcommunity.com/market/search/render/?query=&start=0&count=30&norender=1&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=753&category_753_Game%5B%5D=tag_app_'+appid.toString()+'&category_753_cardborder%5B%5D=tag_cardborder_0&category_753_item_class%5B%5D=tag_item_class_2'
chrome.runtime.sendMessage({'url':url},function(response){
    k=0
    //let URL =  'https://steamcommunity.com/market/search?category_753_Game%5B%5D=tag_app_'+appid.toString()+'&category_753_cardborder%5B%5D=tag_cardborder_0&category_753_item_class%5B%5D=tag_item_class_2&appid=753'
    if(response['total_count'] == 0){
    checker(appid,BR,i)
    }
    else{
        const amount = response['total_count'];
        response['prices']=response['prices'].sort(function(a, b){return a-b});
        B=Number(response['prices'][0])*Number(amount/2).toFixed(0)
        nb=(B*0.87)-BR
        if (nb>0){
            document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+")").style.border='0.5px solid Chartreuse';
            document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+")").style.boxShadow='0px 0px 10px 1px Chartreuse';
            profit=document.createElement('p')
            profit.innerHTML=('<h1>'+nb.toFixed(2).toString()+'</h1>')
            document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+") > div.responsive_search_name_combined > div.col.search_released.responsive_secondrow").prepend(profit)
        }
    else{
        document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+")").style.border='1px solid FireBrick';
        document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+")").style.boxShadow='0px 0px 10px 2px FireBrick';
    }
}})
}
function GetAppIDFromUrl( url ){
    const appid = url.match( /\/app\/([0-9]{1,7})/);
    return appid ? parseInt(appid[1],10) : -1;}
function ff(){
    if (window.location.href.startsWith('https://store.steampowered.com/search/')){
    let queue = document.getElementsByClassName('page_header_ctn search')[0];
    let outer_div = document.createElement('div');
    let inner_div = document.createElement('div');
    outer_div.append(inner_div);
    queue.append(outer_div);
    input=document.createElement('input');
    queue.append(input);
    inner_div.classList.add(...["btnv6_blue_hoverfade", "btn_medium", "queue_btn_inactive"]);
    inner_div.innerHTML = '<span>'+'CHECK GAMES'+'<\/span>';
    outer_div.classList.add('queue_control_button');
    outer_div.id = 'cal_card_div'
    input.id='input'
    outer_div.addEventListener('click',function() {domb();});
}
}
function domb(){
    nb=document.querySelector("#input").value;
    i=1
    f=1
    do{
        if(!(document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+") > div.ds_flag.ds_owned_flag"))){
        test=document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+")").getAttribute('')
        var d = document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+")")
        var url = d.getAttribute('href');
        appid=GetAppIDFromUrl(url)
        price=Number(document.querySelector("#search_resultsRows > a:nth-child("+i.toString()+")> div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div > div").getAttribute('data-price-final'))/100   
        checker(appid,price,i)
        f=f+1
        }
        i=i+1
        
}while(f<Number(nb)+1)
}

document.addEventListener("DOMContentLoaded",ff());