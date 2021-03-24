//alert("Connected!");
const url = "questions.json";
let score = [];
const reader = new FileReader();
let idx = 0;
window.onload = function(){
  $("#start").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
};

async function getQuestions() {
  try {
      let res = await fetch(url);
      let qs = await res.json();
      for( let prop in qs ){
        console.log( qs[prop].question );
    }
      return qs;
  } catch (error) {
      console.log(error);
  }
}
async function fillContainer(idx){
  let questions = await getQuestions();
  let container = $('.container');
  container.css('display', 'block');
  $('#next').css('display', 'inline-block');
  $('#prev').css('display', 'inline-block');
  if (idx<questions.length){
  let html = '';
    let htmlSegment = `<div class="question">
                        <h2>${questions[idx].question}</h2>
                        <ul>
                        <li>
                        <input type="radio" id="1" name="options" value="">
                       <label for="1">${questions[idx].answers[0]}</label>
                       <div class="check"><div class="inside"></div></div>
                       </li>
                       <li>
                       <input type="radio" id="2" name="options" value="">
                      <label for="2">${questions[idx].answers[1]}</label>
                      <div class="check"><div class="inside"></div></div>
                      </li>
                      <li>
                      <input type="radio" id="3" name="options" value="">
                     <label for="3">${questions[idx].answers[2]}</label>
                     <div class="check"><div class="inside"></div></div>
                     </li>
                     <li>
                     <input type="radio" id="4" name="options" value="">
                    <label for="4">${questions[idx].answers[3]}</label>
                    <div class="check"><div class="inside"></div></div>
                    </li>
                    </ul>
                    </div>`;
    html += htmlSegment;
container.html(html);

  }else{
    let result = score.reduce((acc, cur) => acc + cur);
    console.log(result);
    container.html('');
    container.append(`<h2>Oto twoje wyniki</h2> <p class="result">${result}</p>`);
    if (result<7){
      var myRequest = new Request('results/sangwinik.txt');
      fetch(myRequest).then(function(response) {
        return response.text().then(function(text) {
          $(".container").append(`<p>${text}</p>`);
    });
  });
}
if(result>=7 && result<13){
  var myRequest = new Request('results/choleryk.txt');
  fetch(myRequest).then(function(response) {
    return response.text().then(function(text) {
      $(".container").append(`<p>${text}</p>`);
});
});
}if(result>=13 && result<19){
  var myRequest = new Request('results/melancholik.txt');
  fetch(myRequest).then(function(response) {
    return response.text().then(function(text) {
      $(".container").append(`<p>${text}</p>`);
});
});
}if(result>=19 && result<25){
  var myRequest = new Request('results/flegmatyk.txt');
  fetch(myRequest).then(function(response) {
    return response.text().then(function(text) {
      $(".container").append(`<p>${text}</p>`);
});
});
}     
}
}
$("#start").on('click', function(){
  $('body').css('overflow-y', 'scroll');
  fillContainer(0);
  $(this).remove();
  $("video").remove();
  $("p").remove();
  $(".viewport-header").remove();
});
$("#next").on('click', function(){
  let count = 0;
  $("input[type=radio]").each(function(){
    if ($(this).prop('checked')){
      count++;
    }
  });
  if (count === 1){
  idx++;
  fillContainer(idx);
  updateScore(idx);
  }else{
    $("body").prepend(`<p style="color: red">Wybierz jedną opcję!</p>`);
  } 
});
$("#prev").on('click', function(){
  idx--;
  if (idx >= 0){
  fillContainer(idx);
  
   updateScore(idx);
  
  }
});

function updateScore(idx){
  $("input[type=radio]").each(function(){
    if ($(this).prop('checked')){
      let points = $(this).attr('id');
      score[idx] = parseInt(points);
    }
  });

};


