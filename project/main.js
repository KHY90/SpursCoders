document.addEventListener('DOMContentLoaded', function() {
    // 검색 버튼 클릭 이벤트 처리
    document.querySelector('.search-box .button').addEventListener('click', function() {
        search();
    });

    // Enter 키를 눌렀을 때도 검색 실행
    document.querySelector('.search-box input[type="text"]').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            search();
        }
    });

    // 검색 함수
    function search() {
        var searchInput = document.querySelector('.search-box input[type="text"]').value;
        // 여기서는 간단히 검색어를 콘솔에 출력하는 예제를 사용합니다.
        console.log('검색어:', searchInput);
        // 실제로는 검색어를 기반으로 결과를 필터링하고 표시해야 합니다.
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");
    signupBtn.onclick = (()=>{
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    });
    loginBtn.onclick = (()=>{
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    });
    signupLink.onclick = (()=>{
      signupBtn.click();
      return false;
    });
    
    // 로그인 버튼 요소 선택
    const loginButton = document.querySelector('.login .field.btn input[type="submit"]');
        
    // 로그인 버튼 클릭 이벤트 처리
    loginButton.addEventListener('click', function(event) {
        // 기본 동작 방지 (폼 제출)
        event.preventDefault();
        
        // 새 창으로 index.html 열기
        window.open('index.html', '_blank');
    });
    });
    
    // 은행 아이콘을 클릭했을 때 이벤트 리스너 추가
    document.getElementById("bank-icon").addEventListener("click", function (event) {
      // 링크의 기본 동작(페이지 이동)을 막음
      event.preventDefault();
    
      // 은행 정보 배열 생성
      const banks = [
        { name: "신한은행 강남역금융센터", phone: " 0507-1452-5057" },
        { name: "NH농협은행 강남역금융센터", phone: "02-557-3260" },
        { name: "KB국민은행 강남중앙", phone: "1599-9999" },
        { name: "IBK기업은행 강남역", phone: "02-3481-2712" },
        { name: "우리은행 테헤란로금융센터", phone: "02-553-6347" },
        { name: "우리은행 서초금융센터", phone: "02-3473-2511" }
      ];
    
      // 은행 목록을 표시할 컨테이너와 리스트 요소 가져오기
      const bankListContainer = document.getElementById("bank-list-container");
      const bankList = document.getElementById("bank-list");
    
      // 이전에 생성된 리스트 초기화
      bankList.innerHTML = "";
    
      // 배열을 순회하며 리스트 아이템 생성 및 추가
      banks.forEach(bank => {
          const listItem = document.createElement("li");
          listItem.textContent = `${bank.name} - ${bank.phone}`;
          bankList.appendChild(listItem);
      });
    
      // 은행 목록 컨테이너 표시
      bankListContainer.style.display = "block";
    });
