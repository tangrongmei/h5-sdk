// g格式化url,data拼接金url
export function formatUri(url,data) {
  url += (url.indexOf('?') < 0 ? '?' : '') + spliceparmas(data)
  (url,"url")
  return url
  
}

function spliceparmas(data) {
 
  let url = ''
  for (const i in data){
    if(data[i] || data[i] === 0) {
      const value = data[i] !== undefined ? data[i] : ''
      url += `&${i}=${encodeURIComponent(value)}`
    }
  }
  return url ? url.substring(1) : '' // url存在则切割掉第一个& 
}

export function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}