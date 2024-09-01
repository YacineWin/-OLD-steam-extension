link='https://steamcommunity.com/market/multisell?appid=753&contextid=6'
function heyo(){
  if (window.location.href.startsWith('https://steamcommunity.com/profiles/')&& window.location.href.includes('/inventory/')){
Q=document.querySelector("#tabcontent_inventory > div.filter_ctn.inventory_filters")
value=document.createElement('h3')
getgames()
value.innerHTML='0'
value.id='inventoryvalue'
ars=document.createElement('h3')
Q.prepend(value)
}
}
async function getgames(){
  url=window.location.href
  profile=url.match(/profiles\/(\d+)\//)
    items= await fetch('https://steamcommunity.com/profiles/'+profile[1]+'/inventory/json/753/6')
    tr= await items.json()
    b=(tr.rgDescriptions)
    marketHashNames = Object.values(b).map(entry => entry.market_hash_name)
    const groupedItems = {};
    market=''
    for (const item of marketHashNames) {
      market=market+'&items%5B%5D='+encodeURIComponent(item)+'&qty[]=1'
      const [code, itemName] = item.split('-');
      if (!groupedItems[code]) {
        groupedItems[code] = [];
      }
      groupedItems[code].push(itemName);
    }
    val=0
   for(game in groupedItems){
    ids = groupedItems[game]
    getprice(ids,game)  
}
link=link+market
a=document.querySelector("#active_inventory_page")
btn=document.createElement('button')
btn.innerHTML='MULTISELL CARDS AT'
input=document.createElement('input')
input.type='number'
input.id='valat'
a.prepend(input)
a.prepend(btn)
style(btn,input)
btn.addEventListener('click',function(){sell(link)})
}
function getprice(ids,game){
  url='https://steamcommunity.com/market/search/render/?query=&start=0&count=30&norender=1&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=753&category_753_Game%5B%5D=tag_app_'+game.toString()+'&category_753_cardborder%5B%5D=tag_cardborder_0&category_753_item_class%5B%5D=tag_item_class_2'
  chrome.runtime.sendMessage({'url':url},function(response){
    prices=0
    if (response['total_count'] == 0){getprice(ids,game)}
    else{
        for(id of ids){
          nae=game.toString()+'-'+id.toString()
          for(na in response['names'] ){
          if(response['names'][na]==nae){
            prices=(Math.round(prices+Number(response['prices'][na]))*100)/100
            
          }
        }}
        a=document.getElementById('inventoryvalue').innerHTML;
        document.getElementById('inventoryvalue').innerHTML=(Number(a)+prices).toString()
   }
  }
  )
}
function style(btn,input){
  input.style.color='#c7d5e0'
  input.value='0'
  input.step='0.01'
  input.style.width='50px'
  btn.style.color='#66c0f4'
  btn.style.fontSize='11px'
  btn.style.borderRadius='5px'
  btn.style.backgroundColor='#2a475e'
  btn.onmouseover=function(){
    btn.style.backgroundColor='#36647A'
  }
  btn.onmouseout=function(){
    btn.style.backgroundColor='#2a475e'
  }

}
function sell(link){
  val=document.getElementById('valat').value
  window.location.replace(link)
  
}
document.addEventListener("DOMContentLoaded",heyo());