
function normalLoad(values){

        const outputContainer = document.getElementById("outputContainer");
        let lastDay = null;
 
        let currentIndex = 0; 
        const videosPerRow = 5;
        let currentRows = 5;
        
        let windowEvt;
        
        window.removeEventListener("scroll",windowEvt);

        function loadVideos(rowsToLoad) {
            if (currentIndex >= values.length) {
                return;
            }
            
            let videosLoaded = 0;
            let videosToLoad = rowsToLoad * videosPerRow;

            while(videosLoaded<videosToLoad && currentIndex<values.length){
                const value = values[currentIndex];
                currentIndex++;
        
                if (!value.details && !value.subtitles) continue;
                if (!value.titleUrl) continue;

                var videoTitle = value.title.split("Watched")[1].toLowerCase();
                var channelName = (value.subtitles && value.subtitles.length > 0)
                    ? value.subtitles[0].name.toLowerCase()
                    : value.details[0]?.name.toLowerCase();

                    let VIDEOID;
                    const decodedUrl = value.titleUrl.replace(/\\u003d/, '=');
        
                    if (decodedUrl.includes('shorts/')) {
                        
                        VIDEOID = decodedUrl.split('shorts/')[1];
        
                    } else if (decodedUrl.includes('v=')) {
                        
                        VIDEOID = decodedUrl.split('v=')[1];
        
                    } else {
                        continue;
                    }
        
                    if (VIDEOID.includes('&')) {
                        VIDEOID = VIDEOID.split('&')[0];
                    }
        
                    const hourWatch = value.time;
                    const date = new Date(hourWatch);
            
                    const day = date.getUTCDate(); 
                    const month = date.getUTCMonth() + 1; 
                    const year = date.getUTCFullYear(); 
            
                    const hours = date.getUTCHours(); 
                    const minutes = date.getUTCMinutes(); 
                    const seconds = date.getUTCSeconds(); 
                    const miliseconds = date.getUTCMilliseconds(); 
            
                    const completeDate = `${year}-${month}-${day}`;
                    const completeTime = `${hours}:${minutes}:${seconds}.${miliseconds}`;
        
                    const br = document.createElement("br");
                    
                    if (lastDay !== day) {
                        
                        const dayGroupContainer = document.createElement("div");
                        dayGroupContainer.classList.add("day-group");
        
                        const h2 = document.createElement("h2");
                        h2.textContent = `${day}/${month}/${year}`;
        
                        const dayOutput = document.createElement("div");
                        dayOutput.classList.add("output"); 
        
                        dayGroupContainer.appendChild(h2);
                        dayGroupContainer.appendChild(dayOutput);
        
                        outputContainer.appendChild(dayGroupContainer);
        
                        lastDay = day;       
                        videosLoaded = 0;     
                    }

                const a = document.createElement("a");
                a.href = decodedUrl;
                a.setAttribute("data-date", completeDate);
                a.target = "_blank";

                const img = document.createElement("img");
                img.src = `https://img.youtube.com/vi/${VIDEOID}/hqdefault.jpg`;
                img.alt = "video";
                img.loading = "lazy";
          
                const div = document.createElement ("div");
                div.classList.add("video-container");

                const videoText = document.createElement("a");
                videoText.href = decodedUrl;
                const p = document.createElement("p");
                const text = document.createTextNode(value.title.split("Watched")[1]);
                const stext = value.title.split("Watched")[1];
                
                let isAd;

                if (value.subtitles && value.subtitles.length > 0) {
                    isAd = false;    
                }
                else{
                    isAd = true;
                }

                p.title = stext;
                
                p.appendChild(text);
                videoText.appendChild(p);
        
                a.appendChild(img);
                a.appendChild(videoText);
                div.appendChild(a);
                div.appendChild(videoText); 

                if (!isAd) {
                    const channelName = document.createTextNode(value.subtitles[0].name);
                    const pName = document.createElement("p");
                    const aChannel = document.createElement("a");
        
                    aChannel.href = value.subtitles[0].url;
                    aChannel.target="_blank";
        
                    aChannel.appendChild(pName);
                    pName.classList.add("channelName");
                    pName.appendChild(channelName);
                    videoText.appendChild(aChannel);
                }   
                else{
                    
                            const channelName = value.details[0].name;
                            const txtad = document.createTextNode(`AD • `);
                            const txtName = document.createElement("span");
                            const adText = document.createElement("div");
                            txtName.textContent = `${channelName}`;
                            txtName.classList.add("channelName");
                            const divName = document.createElement("div");
                            divName.classList.add("ad");

                            
                            divName.appendChild(txtad);
                            divName.appendChild(txtName);
                            videoText.appendChild(divName);
                            
                            
                        }
            
                outputContainer.lastChild.querySelector('.output').appendChild(div);
                videosLoaded++;

            }
            currentRows += rowsToLoad;
        }

        const button = document.getElementById("btnSearch");
        const closeBtn = document.getElementById("close-btn");
        const btnDate = document.getElementById("btnDate");
        let input = document.getElementById("searchBar");
        let searchActive = false;
             
        button.addEventListener('click', () => {
            if (input.value != "") {
                searchActive = true; 
            }
            else{
                searchActive = false; 
            } 
        });

        closeBtn.addEventListener('click',()=>{
            searchActive = false;
        });

        btnDate.addEventListener('click',()=>{
            const beforeInput = document.getElementById("beforeDate").value;
            const afterInput = document.getElementById("afterDate").value;

            if((beforeInput != '' && afterInput == '') || (afterInput != '' && beforeInput =='') || (beforeInput != '' && afterInput != '')){
                searchActive = true;

            }
            else{
                searchActive = false;
            }
        });

        if(!searchActive){
            loadVideos(4);
        }
        
       windowEvt = function scrollEvt(){
            if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight && searchActive == false){
                loadVideos(4);
            }
        }
        
        window.addEventListener('scroll',windowEvt);

        window.normalScroll = windowEvt;

}

window.normalLoad = normalLoad;

    
    const popup = document.getElementById("popup");
    const filterBtn = document.getElementById("filterBtn");
    
    const inputBox = document.querySelector(".input-container");
    const inputContent = document.querySelector(".input-content");
    const inputClose = document.getElementById("closeInput");

    const btnSearch2 = document.getElementById("btnSearch2");
    const sideBtn = document.getElementById("sideBtn");
    const logoBtn = document.getElementById("logo-btn");
    const backBtn = document.getElementById("backBtn");
    const searchbarc = document.getElementById("searchbarContainer");
    const middle = document.getElementById("middle");
    let sizeEvt = false;
  

    filterBtn.addEventListener('click',(e)=>{
        e.stopPropagation();
        if (popup.style.display === "block") {
            popup.style.display = "none";
        } else {
            popup.style.display = "block";
        }
    });

    popup.addEventListener('click',(e)=>{
        e.stopPropagation();
    });

    document.addEventListener("click",()=>{
        if(popup.style.display === "block"){
            popup.style.display="none";
        }
    })
    
    document.addEventListener("click", function(event) {
        if (event.target && event.target.id === "closeInput") {
            window.scrollTo({
                top: 0,
            });
            window.removeEventListener;
            normalLoad();
        }
    });

  
    window.addEventListener('click', (e) => {
        if (e.target == popup) {
          popup.style.display = 'none'; 
        }
    });

    function togleMode(){
        const initialLogo = document.getElementById("initialLogo");    
        const theme = document.getElementById("theme");
        if (theme.getAttribute("href") === "watchHistoryViewer.css") {
            theme.setAttribute("href", "modes.css"); 
            initialLogo.src = "assets/1734228231551.png";
        } else {
            theme.setAttribute("href", "watchHistoryViewer.css");
            initialLogo.src = "assets/1734228126231.png";
        }
    }

    function sizeCheck(){
        if(window.innerWidth>532){
            btnSearch2.style.display="none";
            filterBtn.style.display="flex";
            sideBtn.style.display="flex";
            logoBtn.style.display="flex";
            backBtn.style.display="none";
            searchbarc.style.display="block";
            middle.style.marginLeft="0";
        }else{
            searchbarc.style.display="none";
            btnSearch2.style.display="flex";
            middle.style.marginLeft="60%";
        }
    }

    window.checkSize = sizeCheck;

    
    btnSearch2.addEventListener("click",()=>{

        searchbarc.style.display="block";
        btnSearch2.style.display="none";
        filterBtn.style.display="none";
        sideBtn.style.display="none";
        logoBtn.style.display="none";
        backBtn.style.display="flex";
        middle.style.marginLeft="0";
        if(!sizeEvt){
            window.addEventListener("resize",sizeCheck);
            sizeEvt = true;
        }
    });

    backBtn.addEventListener("click",()=>{
        searchbarc.style.display="none";
        backBtn.style.display="none";
        middle.style.marginLeft="60%";
        logoBtn.style.display="block";
        filterBtn.style.display="flex";
        btnSearch2.style.display="flex";
        sideBtn.style.display="flex";
        if(!sizeEvt){
            window.removeEventListener("resize",sizeCheck);
            sizeEvt=true;
        }
    });
   