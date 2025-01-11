   const search = document.getElementById("searchBar");

   const botao = document.getElementById("btnSearch");
   const searchBar = document.getElementById("searchBar");
   const closeBtn = document.getElementById("close-btn");
   
   let searchMode = false;
   let input = '';
   const inputContainer = document.getElementById("inputContainer");
   const outputContainer = document.getElementById("outputContainer");
   
   if(inputContainer.children.length==0){
    inputContainer.style.display="none";
}

   function searchTerm() {
       
       if(searchBar.value !== ''){
       
       searchMode = true;
       window.removeEventListener("scroll",window.normalScroll);
       inputContainer.style.display = "flex";

       input = searchBar.value.toLowerCase();
       
       inputContainer.innerHTML = "";
       const inputText = searchBar.value;

        const inputContent = document.createElement("div");
        inputContent.classList.add("input-content");

        const textNode = document.createTextNode(inputText);

        const closeIcon = document.createElement("span");
        closeIcon.id = "closeInput";
        closeIcon.innerHTML = "&times;";
        
        let windowEvt;

        closeIcon.addEventListener("click", function() {
            inputContainer.removeChild(inputContent);
            inputContainer.style.display = "none";
            outputContainer.innerHTML = "";
            window.removeEventListener("scroll",windowEvt);
            window.normalLoad(window.jsonData);
        });

        closeBtn.style.display = "none"; 

        inputContent.appendChild(textNode);
        inputContent.appendChild(closeIcon);

        inputContainer.appendChild(inputContent);

        const values = window.jsonData;
        if(!values){
            return
        }

                outputContainer.innerHTML = ""; 
                
                let lastDay = null;
                let currentIndex = 0;
                const videosPerRow = 5;
                let currentRows = 5;
                
                function loadVideos1(rowsToLoad) {
                    
                    let videosLoaded = 0;
                    let videosToLoad = rowsToLoad * videosPerRow;
                    
                    while (videosLoaded < videosToLoad && currentIndex < values.length) {
                        const value = values[currentIndex];
                        currentIndex++;
    
                        if (!value.details && !value.subtitles) continue;
                        if (!value.titleUrl) continue;
    
                        const videoTitle = value.title.toLowerCase();
                        const channelName = value.subtitles && value.subtitles.length > 0
                            ? value.subtitles[0].name.toLowerCase()
                            : value.details[0].name.toLowerCase(); 

                        if (videoTitle.includes(input) || channelName.includes(input) ) {
                            
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
    
                            if (lastDay !== day) {
                                    if (videosLoaded % videosPerRow != 0) {
                                        const remainingVideos = videosPerRow - (videosLoaded % videosPerRow);
                                        videosLoaded += remainingVideos;

                                   }
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
                            }
    
                            const a = document.createElement("a");
                            a.href = decodedUrl;
                            a.setAttribute("data-date", `${year}-${month}-${day}`);
                            a.target = "_blank";
    
                            const img = document.createElement("img");
                            img.src = `https://img.youtube.com/vi/${VIDEOID}/hqdefault.jpg`;
                            img.alt = "video";
                            img.loading = "lazy";

                            const div = document.createElement("div");
                            div.classList.add("video-container");
    
                            const videoText = document.createElement("a");
                            videoText.href = decodedUrl;
                            const p = document.createElement("p");
                            const text = document.createTextNode(value.title.split("Watched")[1]);
                            p.appendChild(text);
                            videoText.appendChild(p);
    
                            a.appendChild(img);
                            a.appendChild(videoText);
                            div.appendChild(a);
                            div.appendChild(videoText);
    
                            if (value.subtitles && value.subtitles.length > 0) {
                                const channelTextNode = document.createTextNode(value.subtitles[0].name);
                                const pName = document.createElement("p");
                                const aChannel = document.createElement("a");
    
                                aChannel.href = value.subtitles[0].url;
                                aChannel.target="_blank";

                                aChannel.appendChild(pName);
                                pName.classList.add("channelName");
                                pName.appendChild(channelTextNode);
                                videoText.appendChild(aChannel);
                            } else {
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
                    }

                    currentRows += rowsToLoad;
                }
                
                loadVideos1(4); 
    
                windowEvt = function scrollEvt(){
                    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight ) {
                        loadVideos1(4); 
                        }    
                }
                window.addEventListener('scroll',windowEvt);
                searchBar.value = "";
    }
}
window.searchTerm = searchTerm;

    const ddate = document.getElementById("btnDate");
    
    function searchDate(){
        
        const beforeInput = document.getElementById("beforeDate").value;
        const afterInput = document.getElementById("afterDate").value;

        window.removeEventListener("scroll",window.normalScroll);

        searchMode = true;
        let windowEvt;
        
    if(beforeInput!="" && afterInput !=""){
            
        inputContainer.style.display="flex";

        inputContainer.innerHTML="";
        const dateText = beforeInput + "," + afterInput;

        const dateContent = document.createElement("div");
        dateContent.classList.add("input-content");

        const dateNode = document.createTextNode("Between: " + dateText);

        const closeIcon  =document.createElement("span");
        closeIcon.id = "closeInput";
        closeIcon.innerHTML = "&times;";

        closeIcon.addEventListener("click", function(){
            inputContainer.removeChild(dateContent);
            inputContainer.style.display = "none";
            outputContainer.innerHTML = "";
            window.removeEventListener("scroll",windowEvt);
            window.normalLoad(window.jsonData);
        });
        
        closeBtn.style.display = "none";

        dateContent.appendChild(dateNode);
        dateContent.appendChild(closeIcon);

        inputContainer.appendChild(dateContent);
}
    if(beforeInput!="" && afterInput==""){
                
        inputContainer.style.display="flex";

        inputContainer.innerHTML="";
        const dateText = beforeInput;

        const dateContent = document.createElement("div");
        dateContent.classList.add("input-content");

        const dateNode = document.createTextNode("Before: " + dateText);

        const closeIcon  =document.createElement("span");
        closeIcon.id = "closeInput";
        closeIcon.innerHTML = "&times;";

        closeIcon.addEventListener("click", function(){
            inputContainer.removeChild(dateContent);
            inputContainer.style.display = "none";
            outputContainer.innerHTML = "";
            window.removeEventListener("scroll",windowEvt);
            window.normalLoad(window.jsonData);
        });
        
        closeBtn.style.display = "none";

        dateContent.appendChild(dateNode);
        dateContent.appendChild(closeIcon);

        inputContainer.appendChild(dateContent);
    }
    if(afterInput!="" && beforeInput==""){
                
        inputContainer.style.display="flex";

        inputContainer.innerHTML="";
        const dateText = afterInput;

        const dateContent = document.createElement("div");
        dateContent.classList.add("input-content");

        const dateNode = document.createTextNode("After: " + dateText);

        const closeIcon  =document.createElement("span");
        closeIcon.id = "closeInput";
        closeIcon.innerHTML = "&times;";

        closeIcon.addEventListener("click", function(){
            inputContainer.removeChild(dateContent);
            inputContainer.style.display = "none";
            outputContainer.innerHTML = "";
            window.removeEventListener("scroll",windowEvt);
            window.normalLoad(window.jsonData);
        });
        
        closeBtn.style.display = "none";

        dateContent.appendChild(dateNode);
        dateContent.appendChild(closeIcon);

        inputContainer.appendChild(dateContent);
    }

        const values = window.jsonData;

        if(!values){
            return
        }

            const outputContainer = document.getElementById("outputContainer");
                outputContainer.innerHTML = ""; 
                
                let lastDay = null;
                let currentIndex = 0; 
                const videosPerRow = 5;
                let currentRows = 5;

                function loadDate(rowsToLoad){
                    let videosLoaded = 0;
                    let videosToLoad = rowsToLoad * videosPerRow;
    
                    while (videosLoaded < videosToLoad && currentIndex < values.length) {
                        const value = values[currentIndex];
                        currentIndex++;
                        if (!value.details && !value.subtitles) continue;
                        if (!value.titleUrl) continue;

                        const hourWatch = value.time;
                        const date = new Date(hourWatch);

                        const dayInput = String(date.getUTCDate()).padStart(2,'0'); 
                        const monthInput = String(date.getUTCMonth() + 1).padStart(2,'0'); 
                        const yearInput = date.getUTCFullYear(); 

                        const dateInput=`${yearInput}-${monthInput}-${dayInput}`

                        if((dateInput<beforeInput && afterInput == '') || (dateInput>afterInput && beforeInput == '') || (dateInput<beforeInput && dateInput>afterInput)){
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
                            a.setAttribute("data-date", `${year}-${month}-${day}`);
                            a.target = "_blank";
    
                            const img = document.createElement("img");
                            img.src = `https://img.youtube.com/vi/${VIDEOID}/hqdefault.jpg`;
                            img.alt = "video";
                            img.loading = "lazy";
    
    
                            const div = document.createElement("div");
                            div.classList.add("video-container");
    
                            const videoText = document.createElement("a");
                            videoText.href = decodedUrl;
                            const p = document.createElement("p");
                            const text = document.createTextNode(value.title.split("Watched")[1]);
                            
                            p.appendChild(text);
                            videoText.appendChild(p);
    
                            a.appendChild(img);
                            a.appendChild(videoText);
                            div.appendChild(a);
                            div.appendChild(videoText);
    
                            if (value.subtitles && value.subtitles.length > 0) {
                                const channelTextNode = document.createTextNode(value.subtitles[0].name);
                                const pName = document.createElement("p");
                                const aChannel = document.createElement("a");
    
                                aChannel.href = value.subtitles[0].url;
                                aChannel.target="_blank";

                                aChannel.appendChild(pName);
                                pName.classList.add("channelName");
                                pName.appendChild(channelTextNode);
                                videoText.appendChild(aChannel);
                            } else {
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
                    }
                    currentRows += rowsToLoad;
                }
    
                loadDate(4);
                
                windowEvt= function scrollEvt(){
                    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight ) {
                        loadDate(4); 
                    }
                }
                window.addEventListener('scroll',windowEvt);
            }
                    
ddate.addEventListener('click',searchDate);
            
function clearBtn() {
    if (searchBar.value.length > 0) {
        closeBtn.style.display = "block"; 
    } else {
        closeBtn.style.display = "none"; 
    }
}

searchBar.addEventListener("input", clearBtn);

closeBtn.addEventListener("click",function() {
        searchBar.value = ""; 
        closeBtn.style.display = "none";
    });
    
botao.addEventListener("click",searchTerm);
