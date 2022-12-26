# Diver(책 리뷰 공유 sns)📘 
> 안녕하세요! 인상깊은 책의 구절을 사람들과 공유하고, 책으로 소통할 수 있는 sns 다이버입니다.<br>
> 책 읽는 것을 좋아하고<br>
>  다른사람과 읽은 책에 대해 이야기 나눌 수 있는 플랫폼이 없어서 아쉬웠던 분들을 위한 서비스입니다. <br>
>  
[시연영상 보러가기](https://www.youtube.com/watch?v=mCjRsjOgnOw)   

<br>
<br>

## 목차
 1. [팀원 소개 및 제작 기간](#팀원-소개-및-제작-기간)
 2. [프로젝트 소개](#프로젝트-소개)
 3. [사용 기술](#사용-기술)
 4. [협업 과정](#협업-과정)
 5. [신경 쓴 부분](#-신경-쓴-부분)
 6. [기능소개/실행화면](#기능소개/-실행-화면)

<br>
<br>



## 팀원 소개 및 제작 기간


- 2021년 7월 23일 ~ 
- 7인 1조 팀프로젝트
  + 프론트엔드 (React) : 노예찬, 이현주 
  + 백엔드 (Node.js) : 김승빈, 권오빈
  + 디자이너 : 조민정, 김언용, 곽은주
<br>
<br>

## 프로젝트 소개

![ezgif com-gif-maker](https://user-images.githubusercontent.com/70359952/131693331-1829bac8-6288-47be-bd28-a4c7cf06b0cb.gif)   

<br>

* 책을 좋아하는 사람들이 읽은 책의 구절을 공유하고 책을 추천하면서
* 책을 중심으로 소통이 이루어지는 sns 서비스 입니다.   
[시연영상 보러가기](https://www.youtube.com/watch?v=mCjRsjOgnOw)   


<br>
<br>

## 사용 기술


`Front-end`
-  React
- javascript


`Back-end`
-  ([Backend Repository이동](https://github.com/sharingBookReview-SERVICE/sharingBookReview-BE))


`deploy`
- AWS S3 
- Route 53
- Cloud front
- https

<br>
<br>

##  협업 과정


- 전체 팁 협업 : `notion`
- 협업
	+ `Figma`, `zeplin`을 통하여 디자이너와 협업
	+ `swagger`을 이용하여 백엔드와 협업

- 구현   
	: 모든 작업은 다음과 같은 과정을 거쳤습니다.
	![깃허브 리드미](https://user-images.githubusercontent.com/70359952/131766461-81427882-4d77-4085-bf00-213e02d47558.PNG)
	
- 전략 <b>우리는 깃 플로우 전략을 사용했습니다.</b> <br>
	<img height="300" src="https://user-images.githubusercontent.com/70359952/131854009-f611423d-278c-4048-a269-dfb5b6b389bd.png"/>
	<img width="300" src="https://user-images.githubusercontent.com/70359952/131852285-07469bc2-7578-4f7c-8dbc-767019a73d00.png"/>

<br>

> + 각자의 `origin develop branch` 에서 작업했습니다.<br>
> + 각각 기능마다 feature 브랜치를 생성한 후 작업을 진행했습니다. <br>
> + `pull request`를 통해 `upstream`에 `merge`하였으며 , <br>
> + `rebase`를 통해 커밋내역을 `linear`하게 유지할 수 있었습니다. <br>
> + 그 결과, 어느 부분에서 어떤 코드가 추가 되고 오류가 났는지 쉽게 확인 할 수 있어 `디버깅시 효율`이 높아졌습니다. 

<br>
<br>


## ✨ 신경 쓴 부분 
<br>

### 1. 최적화

<b> 어떻게 특별한 기능을 넣을까? 보다 <br>
'어떻게 하면 최적화할 수 있을까?'를 고민했습니다. </b>
<br>
<br>

**1)무한스크롤 구현**
- 메인페이지에서 한번에 모든 게시물을 불러올 때, 렌더링 속도가 느려질 것을 고려하여 무한스크롤 기능을 구현하였습니다.<br> 
- 기존의 스크롤 이벤트를 계산하는 방식으로 무한 스크롤을 계산할 경우, 불필요한 scroll 이벤트가 발생하고, Dom 요소의 reflow로 인해 브라우저 성능이 저하되는 것을 발견했습니다.<br>
- 때문에 이벤트에 최적화된 intersection observer api를 활용하여, 무한스크롤을 구현했습니다. 
<br>
<br>

**2)이미지 lazy loading**
- 메인페이지에서 무한 스크롤을 통해 데이터 요청을 끊어하는 것을 넘어서, 초기 렌더링 속도를 높일 수 있는 방법을 찾고 고민했습니다.<br>
그 결과, 이미지에 레이지 로딩을 적용할 경우 초기 렌더링 속도를 향상시킬 수 있다는 사실을 알게되었습니다. 
- 무한스크롤과 마찬가지로 intersection observer api를 활용해, 화면에 0.1 비율로 나타날 때, 이미지를 불러오도록 했습니다.
- data-src에 img url을 기록해두고, 해당 이미지가 화면에 0.1비율 나타날 때, 이미지의 src에 url값을 넣어주었습니다.

```jsx
// 이미지 관찰 ref
  const observeImage = useRef(null) 
...
// 관찰시 실행할 함수
  const showImage = async([entry], observer) => {
    if (!entry.isIntersecting) {
      return
    }
    const imageUrl = [entry][0].target.dataset.src //dataset을 통해 data-src를 가지고 오기
    observeImage.current.src = imageUrl // 이미지에 src를 넣어주기
    observer.unobserve(entry.target) // 함수가 실행될 때, 관찰을 끝내기.
}

//옵저버 인스턴스 선언
  useEffect(() => {
      const observer = new IntersectionObserver(showImage, {threshold: 0.1}); //메인이미지 관찰
      observer.observe(observeImage.current)
    return () => {
      observeImage.disconnect();}
    },[])

...
   <Image
    alt="Feed_img"
    data-src={image}
    ref={observeImage}
    onClick={() => {
    goToReviewDetail();
    }}
/>
```
<br>
<br>

**3)이미지 압축**
- s3의 저장공간을 최적화하고, get 요청시 이미지를 불러오는 속도를 높이기 위해 압축하여 서버에 전송했습니다. <br>
- 이를 위해 Browser Image Compression 라이브러리를 사용했습니다.
- 라이브러리는 주간 다운로드수와, 최신 업데이트일을 확인한 후 선정했습니다. 

<br>

![리뷰작성사진](https://user-images.githubusercontent.com/70359952/131838102-b921d143-8ca9-4ccf-a85e-16cced1443e1.gif)
<br><br>

**4)번들 최적화 및 파일 최적화**
- 브라우저 성능을 높이기 위해서 공부하는 중, 번들 파일을 잘게 쪼개는 것이 초기 렌더링 속도를 높여준다는 것을 알게 되었습니다. <br>
- 때문에 코드 스플릿팅을 통해서, 큰 번들을 잘게 쪼개는 작업을 진행했습니다. 
- bundle-analyzer를 통해 번들을 분석했고, 용량이 큰 파일들을 확인 후 개선해나가는 중입니다.<br>
lottie 라이브러리가 용량이 크다는 것을 확인 후, 더 가벼운 lottie-web-light 버전으로 바꾸었고, lodash의 용량이 큰 것을 확인 후, 해당 라이브러리를 삭제하고 직접 구현 가능한 부분은 직접 구현하도록 하였습니다. <br>
lottie 개개의 파일이 크다는 것을 확인했고, 압축을 할 수 있는 방법을 찾아 개선해나갈 예정입니다.



<details>
<summary>성능개선 적용 목록</summary>
<div markdown="1">
       
* 사용자 업로드 이미지 파일 압축 
* 코드 스플릿팅을 통해 컴포넌트를 레이지 로딩하고, 이를 통해 번들 최적화 실행.
* 웹폰트 import해오는 것을 삭제 후, 경량화 폰트 다운로드 후 설정 진행중. 
* 이미지 레이지 로딩
* 무한 스크롤 구현 
* default 이미지 파일들 압축 후, 다시 적용. 
* cloudfront gzip 적용 
* lodash 라이브러리 삭제 후, 기능 직접 구현 (디바운스)
* 로티 라이브러리 파일 크기가 큰 것을 확인 후, light버전으로 바꾸기. 
<br>
<br>

`이런 내용들을 적용한 후에, 3G환경에서 메인페이지 초기 랜더링 속도를 21초에서 6초로 줄일 수 있었습니다.` 

</div>
</details>

<br>
<br>

**5)결과**
- 결과적으로, 이미지가 많은 메인 페이지의 랜더링 속도를 3G환경에서 측정했을 때 **21초가 걸리던 시간을 6초까지** 무려 **3.5배 향상**시킬 수 있었습니다.<br> 
메인페이지 뿐만 아니라, 다른 페이지에서도 지속적으로 속도를 개선해나갈 계획입니다. 

<details>
<summary>느낀점</summary>
<div markdown="1">
프로젝트 진행시, 웹성능을 높이기 위한 시도를 한 것은 이번이 처음이었습니다. 
이 시도를 통해서, 느낀점이 많았습니다. 
어떤 요소들이 웹성능을 저하시키는지 알게 되었고, 
다음부터는 시작단계에서부터 어떤 요소들을 고려해야 웹성능에 최적화될 수 있는지,
조금은 볼 수 있는 눈이 생긴 것 같습니다. 
</div>
</details>

<br>
<br>


**6)React.memo를 활용하여 리렌더링 방지**
- 불필요하게 리렌더링 되는 컴포넌트를 방지하기 위하여 컴포넌트를 세분화하고 <br>
- React.memo를 활용하였습니다.
- 그 결과, 아래 사진에서 보시는 것과 같이, <전> 사진에서는 불필요한 렌더링이 일어나고 있지만, <후> 사진에서는 불필요한 랜더링이 일어나지 않고 있습니다. 
<br>
<img height="500px" src="https://user-images.githubusercontent.com/70359952/131948150-53365531-9ba2-47f8-b1da-0ff4e2093a2d.png"/>

<br>

```jsx
const ChoicedBook = React.memo(()=>{
    return(
      <BookChoice
      onClick={() => {
        dispatch(permitActions.showModal(true));
      }}
    >
      <img src={add_button} alt="add btn" />
      <Text >리뷰할 책 선택하기</Text>
    </BookChoice>
    )
  })
```


<br>
<br>

### 2. 사용자 중심 

<b> 어떻게 특별한 기능을 넣을까? 보다 <br>
'어떻게 하면 UX중심적인 개발을 할 수 있을까?'를 고민했습니다. </b>
<br>

**1)사용자 게시글 읽음 전송**
- 사용자에게 맞춤형 피드를 구성하기 위해서, 사용자가 해당 게시글을 읽었다는 데이터를 서버에 보내줄 필요가 있었습니다. <br>
이것을 어떻게 구현할지 고민하던 중, intersection observer를 활용해 화면에 게시물이 나타나면 해당 게시물의 아이디를 서버에 보내주면 되겠다고 생각했습니다. 
- 이것을 구현할 때, 생긴 2가지 어려움이 있었습니다. 1.useRef를 화면의 모든 게시물에 붙이는 방법 2.화면에 나타난 게시물의 아이디 값을 구하는 방법. 
- 1.useRef를 모든 게시물에 붙이는 방법 : 일반적인 방법으로는 반복문을 돌려서 ref를 컴포넌트마다 붙일 수가 없었습니다. 그래서 검색도 해보고 찾아본 결과, useState를 활용하면 ref를 반복문을 통해서 생성할 수 있음을 알게되었습니다. 이것을 아래와 같이 구현하였습니다.<br>
```jsx
  const ReviewCount = reviewList.length; //리뷰의 갯수
  const [elRefs,setElRefs] = useState([]); //ref를 생성할 useState

  //게시물 하나당 ref를 붙이기 위한 작업
  useEffect(() => {
//의존성 배열을 통해, 리뷰의 갯수가 변화될 때마다 다시 ref를 생성한다. 해당 idx에 ref가 있으면 생성하지 않는다. 
    setElRefs(elRefs => (
      Array(ReviewCount).fill().map((_,i) => elRefs[i] || createRef())
    ))
  },[ReviewCount])
```
- 2.화면에 나타난 게시물의 아이디값을 구하는 방법 : 아이디를 구할 방법이 잘 생각나지 않아 고민을 하다, data- 속성을 사용하면 쉽게 구할 수 있겠다는 생각이 들었습니다. 떄문에 아래와 같이 구현하였습니다. 
```jsx
//옵저버가 관찰될 때, 실행할 함수 => 해당 게시물의 아이디 값을 서버에 보내서, 사용자가 이 게시물을 '읽었다'는 것을 체크해주기 
  const sendIsRead = async([entry], observer) => {
    if (!entry.isIntersecting) {
      return
    }
    const showedReviewId = [entry][0].target.dataset.id
    observer.unobserve(entry.target) // 함수가 실행될 때, 관찰을 끝내기.
    dispatch(reviewActions.checkIsRead(showedReviewId)) //관찰한 게시물의 아이디를 보내기
}

...
  useEffect(() => {
  let observer

  //ref요소가 존재하고, 페이지의 로딩이 끝나면 옵저버 인스턴스를 생성하기. 
    if(elRefs[0] && !is_loading){
    // 절반반 읽어도, 게시물 읽음을 보내기 
    observer = new IntersectionObserver(sendIsRead, {threshold: 0.5});
    reviewList.forEach((_, idx) => {
      //리뷰의 갯수만큼 생성된 ref에 옵저버를 붙이기
      observer.observe(elRefs[idx].current)
    });
  }
  //화면을 나갈때 옵저버의 연결을 해제하기. 
  return () => observer?.disconnect();
  },[elRefs])


...
<CartWrapper ref={setRef}  data-id={_id}>
...
```

<br>
<br>

**2)스크롤 위치 기억**

<br>

- 사용자가 다른 페이지로 갔다가 돌아왔을때 보던 게시물로 돌아오는 것이 사용자 경험적으로 편할 것이라고 생각했습니다. <br>
- 스크롤 위치를 `리덕스`에 저장했습니다. <br>
- 스크롤 위치가 바뀔때마다 액션을 불러오는 것이 비효율적이라 생각하여 <br>
- `디바운스`를 사용하여 사용자가 스크롤을 멈추었을 시 리덕스에 위치를 저장해두었습니다. <br>

![스크롤 위치 저장](https://user-images.githubusercontent.com/70359952/132820132-4e2797af-fb68-4b20-adc6-a2d7ca046018.gif)


<br>

```jsx
  
  let timer;
  const scroll = (e)=>{
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      dispatch(reviewActions.saveCurrentScroll(e.target.scrollTop))
    }, 500);

  }

```

<br>


**3) 책 검색 자동완성**
- 네이버에 저장된 책들을 검색할 수 있습니다. <br>
- 사용자가 검색어를 입력하면 0.2초후에 서버에 요청을 보냅니다(`디바운스` 이용). <br>
- 서버에서 보내주는 책의 제목을 보여줍니다. <br>
- 책의 제목을 클릭하면 해당 책들이 보여집니다. <br>


<img  width="300px" src="https://user-images.githubusercontent.com/70359952/132818701-5837117e-792a-4de9-be0a-dd5cfde20c4a.png"/>
<img  width="300px" src="https://user-images.githubusercontent.com/70359952/132818788-cc4871ed-524c-453a-b5ef-9355ac5c382f.png"/>

<br>

```jsx
  let timer;
  const search = ()=>{
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      dispatch(searchActions.getSearchBooksSV(text.current.value))
      setAutoComplete(true)
    }, 200);
  ```


<br>
<br>

## 기능소개/ 실행 화면

|<img src="https://user-images.githubusercontent.com/71473074/209509024-0257d8a6-033e-4aee-9147-e93d9d46ddda.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209508666-d87ca2cf-d391-4a0e-aa69-05b92d21b73c.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209508752-ffd4f894-ef7c-4822-8858-215cfaea1832.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209508870-0ab6042c-63a2-4930-9d7e-818cbf368691.gif"  width="200" />| 
|:---:|:---:|:---:|:---:|
|좋아요기능|책검색기능|이미지 검색기능|팔로우기반 피드업데이트| 
|<img src="https://user-images.githubusercontent.com/71473074/209509165-5886fbf2-1af4-4f22-a51d-5c11acdd9d2d.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209509228-3af5d596-7a73-4b81-b13d-f99cc756f608.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209509303-9731bf00-4c32-4980-b03b-44d3c1b98de0.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209509366-39834882-bf7e-45ba-a6b3-1d034e06ace1.gif" width="200" />|
|북마크 기능|팔로우 기능|팔로우기반 알림기능|북 컬렉션 만들기| 
|<img src="https://user-images.githubusercontent.com/71473074/209509596-91252c35-161c-49ef-8fb6-b944b4b351d9.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209509635-266aac4e-3620-43d4-9555-0bfc4e684f64.gif" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209509673-c4d8fb49-d375-4808-b3b6-36267a3f788d.png" width="200" />|<img src="https://user-images.githubusercontent.com/71473074/209509738-8c898d91-e564-4f72-8e70-4e237a13d91e.gif" width="200" />|
|해시태그 기반 추천도서|레벨 시스템 기반 칭호관리|소셜 로그인|추천해시태그 기능|
|<img src="https://user-images.githubusercontent.com/71473074/209509734-9825106e-1210-4536-931e-f10087d58b5c.gif"  width="200" />|
|댓글 기능(수정,삭제)| 


<br>
<br>

## dependencies

<br>

 + "@material-ui/core": "^4.12.3" <br>
 +   "@material-ui/icons": "^4.11.2" <br>
 +   "@testing-library/jest-dom": "^5.11.4" <br>
 +   "@testing-library/react": "^11.1.0" <br>
 +   "@testing-library/user-event": "^12.1.10" <br>
 +   "axios": "^0.21.1" <br>
 +   "browser-image-compression": "^1.0.14" <br>
 +   "connected-react-router": "6.8.0" <br>
 +   "global": "^4.4.0" <br>
 +   "history": "4.10.1" <br>
 +   "immer": "^9.0.5" <br>
 +   "jwt-decode": "^3.1.2" <br>
 +   "lottie-web-light": "^1.1.0" <br>
 +   "react": "^17.0.2" <br>
 +   "react-dom": "^17.0.2" <br>
 +   "react-ga": "^3.3.0" <br>
 +   "react-intersection-observer": "^8.32.0" <br>
 +   "react-kakao-login": "^2.1.0" <br>
 +   "react-redux": "^7.2.4" <br>
 +   "react-router-dom": "^5.2.0" <br>
 +   "react-scripts": "^4.0.3" <br>
 +   "redux": "^4.1.0" <br>
 +   "redux-actions": "^2.6.5" <br>
 +   "redux-logger": "^3.0.6" <br>
 +   "redux-thunk": "^2.3.0" <br>
 +   "sass": "^1.37.5" <br>
 +   "socket.io-client": "^4.1.3" <br>
 +   "styled-components": "^5.3.0" <br>
 +   "swiper": "^6.8.1" <br>
 +   "web-vitals": "^1.0.1" <br>
 


<br>
