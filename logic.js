function interFace() // 초기 인터페이스, 메뉴버튼을 뿌려준다.
{
    var List = document.getElementById('menu')
    
    for(let i = 0; i < buttons.length; i++)
    {
        if(i === 0)
        {
            List.innerHTML += '<button class = menuButtons style=\"margin-left: 0px;\">'+buttons[i]+'</button>'
        }
        else
            List.innerHTML += '<button class = menuButtons>'+buttons[i]+'</button>'
    }
    
    interFaceDetails();
}

function interFaceDetails() // 클릭시 해당되는 기능의 인터페이스를 뿌려준다.
{
    var details = document.getElementsByClassName('menuButtons');

    details[0].onclick = list;
    details[1].onclick = function makingWordInterFace() // 단어 생성창을 만든다.
    {
        content.innerHTML = '';
        content.innerHTML += "<div class =\'titleInput\'><h2>단어</h2></div>";
        content.innerHTML += "<div class =\'contentInput\'><input name=\"word\" type=\"text\"/></div>";
        content.innerHTML += "<div class =\'titleInput\'><h2>정의<h2></div>";
        content.innerHTML += "<div class =\'contentInput\'><textarea name=\"content\" cols=\"84\" rows=\"13\" ></textarea></div>";
        content.innerHTML += "<div id = \'submit\'><a>제출</a></div>";
        storeInformation();
    };
    details[2].onclick = function() // 브라우저 종료
    {
         window.open("about:blank","_self").close();
    };
}

function list() // 기존에 있는 단어를 보여준다.
{
    content.innerHTML = '';
    content.appendChild(document.createElement('ol'));

    words.forEach(function(word)
    {
        content.children[0].innerHTML += "<li class = \"wordDetails\"><h3>"+ word["word"] + "</h3></li>";
    })
    showingWordDetails(); // 단어의 상세 내용으로 넘어간다.
}

function storeInformation() //data의 words로 단어와 정의를 객체화하여 넘긴다. // 오류 고치자
{
    var word = document.getElementsByName("word")[0];
    var definition = document.getElementsByName("content")[0];
    var submit = document.getElementById('submit');

    submit.onclick = function()
    {               
        if(word.value !== '' && definition.value !== '')
        {
            words.push({"word":word.value,"definition":definition.value});   
            words.sort(function(a, b) {
                var nameA = a.word.toUpperCase(); // ignore upper and lowercase
                var nameB = b.word.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {return -1;}
                if (nameA > nameB) {return 1;}  
                return 0;
              });
              
            word.value = '';
            definition.value = '';    
        }
        else if(word.value === '' && definition.value !== '')
        {
            alert('단어를 입력해주세요.');
        }
        else if(word.value !== '' && definition.value === '')
        {
            alert('정의를 입력해주세요.');
        }
        else
        {
            alert('단어와 정의를 입력해주세요.');
        }
    }
}

function showingWordDetails() // 단어를 클릭하면 단어의 뜻이 함께 나온다.  // 삭제기능을 추가하자.
{
    var allOfWord = document.getElementsByClassName("wordDetails");
    var content = document.getElementById('content');
    var footerButtons = document.getElementsByClassName("footer-buttons");

    for(let i = 0; i < words.length; i++)
    {
        allOfWord[i].onclick = function() // 단어의 뜻을 보여줌.
        {   
            controlInterFace();

            function controlInterFace() // 단어 클릭 시 단어명세들을 보여줌.
            {
                content.innerHTML = '';
                content.innerHTML += "<div class =\'titleInput\'><h2>단어</h2></div>";
                content.innerHTML += "<div class = \'clickWord\'>"+words[i]["word"]+"</div>";
                content.innerHTML += "<div class =\'titleInput\'><h2>정의<h2></div>";
                content.innerHTML += "<div class = \'clickWord\'>"+words[i]["definition"]+"</div>";
                content.innerHTML += "<div id = \'footer\'></div>";

                document.getElementById("footer").innerHTML += "<div class = \'footer-buttons\'><a>변경</a></div>";
                document.getElementById("footer").innerHTML += "<div class = \'footer-buttons\'><a>삭제</a></div>";                               

                // '변경' 버튼, 클릭 시 내용 변경    
                footerButtons[0].onclick = changeContent;
                // '삭제' 버튼 클릭 시 내용 삭제
                footerButtons[1].onclick = function() 
                {
                    if(confirm("단어를 삭제하시겠습니까?"))
                    {
                        removeWord(); 
                        list();
                    }                
                }
            }

            function changeContent()  
            {
                var innerValue = document.getElementsByClassName('clickWord');
                var wordTitle = document.getElementsByName("word");
                var wordDefinition = document.getElementsByName("content");
            
                document.getElementById("footer").remove();
                content.innerHTML += 
                '<div id="footer-rerocate">' +'<div class="footer-buttons">' +'<a>변경</a>' +
                '</div>' + '<div class="footer-buttons">' + '<a>삭제</a>' +'</div>' + '</div>';
            
                innerValue[0].innerHTML = '<input name="word" type="text">';
                wordTitle[0].value = words[i]["word"];
            
                innerValue[1].innerHTML = '<textarea name="content" cols="84" rows="13"></textarea>';
                wordDefinition[0].value = words[i]["definition"];
            
                // '변경' 버튼, 클릭 시 내용 확정    
                footerButtons[0].onclick = function reDefine()
                {                 
                    words[i].word = wordTitle[0].value;
                    words[i].definition = wordDefinition[0].value;           
                    controlInterFace();
                };
                // '삭제' 버튼 클릭 시 내용 삭제
                footerButtons[1].onclick = function() 
                {
                    if(confirm("단어를 삭제하시겠습니까?"))
                    {
                        removeWord(); 
                        list();
                    }                
                }

            };  

            function removeWord() // 클릭 시 내용 삭제
            {    
                words.splice(i,1)   
            };  
            
        }    
    }       
}

interFace();

