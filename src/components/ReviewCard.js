//import 부분
import React,{useState, useEffect, useRef} from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Color from "../shared/Color";

import {images} from "../shared/Image";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as collectionActions } from "../redux/modules/collection";
import { history } from "../redux/configStore";

import ReactGA from "react-ga";
import LikeLottie from '../img/lottie/LikeLottie';

const ReviewCard = (props) => {
  const dispatch = useDispatch();

  //imformation for reviewCard
  const {
    content,
    hashtags,
    quote,
    koreaTime,
    book,
    _id,
    myLike,
    likeCount,
    comments,
    image,
    user,
    bookmark,
    setRef
  } = props;
  const bookTitle = book?.title.split("(")[0]
  const bookAuthor = `${book.author} 저`
  // console.log(searched_collection)

  //permit check 
  const is_login = useSelector((state) => state.user.is_login);
  

  const userId = useSelector((state) => state.user.user._id);
  const reviewUserId = user.id//
  const profileImage = user?.profileImage;
  const observeImage = useRef(null)
  const observeProfile = useRef(null)

  let is_my_post = false;

  
  if (reviewUserId === userId) {
    is_my_post = true;
  }

  //lottie 좋아요
  const [likebtn, setLikeBtn] = useState(false);

  //좋아요 클릭
  const clickLikeButton = () => {
    if(is_login) {
      dispatch(reviewActions.LikeSV(book._id, _id, reviewUserId));
      if(!myLike){
        setLikeBtn(true)
        setTimeout(() => {
          setLikeBtn(false)
        }, (3000));
      }
      
      return;
    }else{
      dispatch(permitActions.showLoginModal(true))
    }
  };

  //피드 아이디를 리덕스에 저장하기
  const getFeedId = () => {
    dispatch(reviewActions.getFeedId(book._id, _id));
  };

  //수정 모달 보여주기 
  const showEditModal = () => {
    dispatch(permitActions.showEditModal(true));
  };

  //디테일 페이지로 이동
  const goToReviewDetail = () => {
    if(is_login){
      history.push(`/reviewdetail/${book._id}/${_id}`)
      dispatch(permitActions.isLoading(true))
    }else{
      dispatch(permitActions.showLoginModal(true))
    }
  }

  //댓글을 클릭했을 때, 디테일 페이지로 이동
  const goDetailByComment = () => {
    if(is_login){
      history.push(`/reviewdetail/${book._id}/${_id}?comment=true`)
      dispatch(permitActions.isLoading(true))
    }else{
      dispatch(permitActions.showLoginModal(true))
    }
  }

  //다른 유저의 피드에 들어가기
  const goToUserFeed = (user_id) => {
    //로그인 하지 않으면 사용 못함
    if(!is_login){
      dispatch(permitActions.showLoginModal(true))
      return;
    }

    if (reviewUserId === userId) {
      //내 프로필을 클릭하면 내 피드로 이동
      history.push("/myfeed");
    }else{
      //다른 유저피드이면 다른 유저 피드로 이동 
      history.push(`/otherUser/${user_id}`)
    }
  }

  const bookMark = ()=>{
      if(is_login) {
      dispatch(reviewActions.bookMarkSV(book._id, _id));
      return;
    }else{
      dispatch(permitActions.showLoginModal(true))
    }
  }

  //태그 선택하면 컬렉션 검색
  const searchCollection = (hashtag) =>{
    dispatch(collectionActions.searchCollectionSV(hashtag))
  }

  const showImage = async([entry], observer) => {
    if (!entry.isIntersecting) {
      return
    }
    const imageUrl = [entry][0].target.dataset.src //보여진 리뷰의 인덱스
    observeImage.current.src = imageUrl
    observer.unobserve(entry.target) // 함수가 실행될 때, 관찰을 끝내기.
}

const showProfile = async([entry], observer) => {
  if (!entry.isIntersecting) {
    return
  }
  const imageUrl = [entry][0].target.dataset.src //보여진 리뷰의 인덱스
  observeProfile.current.src = imageUrl
  observer.unobserve(entry.target) // 함수가 실행될 때, 관찰을 끝내기.
}

  useEffect(() => {
      const ImageObserver = new IntersectionObserver(showImage, {threshold: 0.1}); //메인이미지 관찰
      ImageObserver.observe(observeImage.current)
    return () => {
      ImageObserver.disconnect();}
    },[])

  useEffect(() => {
    const profileObsever = new IntersectionObserver(showProfile, {threshold: 0.1}); //프로필이미지 관찰
    profileObsever.observe(observeProfile.current)
    return () => {
      profileObsever.disconnect();}
  },[])

  return (
    <React.Fragment>

      <CartWrapper ref={setRef}  data-id={_id}>
       
        <CardBox>
          <CommentUserBox>

            <UserLeftBox>
              <ImgWrapper 
              onClick={()=>{
                goToUserFeed(user.id);

                ReactGA.event({
                  category: "Button",
                  action: "go to other's profile",
                  label: "profile",
                });
              }}>
                <ProfileImg
                alt="profile_img"
                ref={observeProfile} 
                data-src={images[profileImage]}  />
              </ImgWrapper>

              <Box direction={"row"}>
                <Box direction={"row"}>
                  <UserName onClick={()=>goToUserFeed(user.id)}>{user.nickname}</UserName>
                 
                </Box>
                <CreatedAt>{koreaTime}</CreatedAt>
              </Box>
            </UserLeftBox>

            <UserRightBox>
              
              {is_my_post && (
                <MoreHorizIcon
                  style={{ color: "#9e9e9e", cursor:"pointer" }}
                  onClick={() => {
                    showEditModal();
                    getFeedId();
                  }}
                />
              )}
            </UserRightBox>
          </CommentUserBox>

          <ContentBox
            onClick={() => {
              goToReviewDetail();
              
            ReactGA.event({
              category: "Button",
              action: "go to review detail",
              label: "reviewdetail",
            });
            }}
          >
            <BookTitle>
              {bookTitle} | {bookAuthor}
            </BookTitle>
            {quote ? <Quote >{quote}</Quote> : ""}
            {content ? <Content>{content}</Content> : ""}

          </ContentBox>

          {image ?
          <ImageBox>

            {likebtn && <LikeLottie/>}
            
            <Image
              alt="Feed_img"
              data-src={image}
              ref={observeImage}
              onClick={() => {
                goToReviewDetail();
              }}
            />
          </ImageBox> : ""}

          <HashTagBox>
              {hashtags?.map((tag, idx) => (
                <HashTag onClick={()=>{ 
                  searchCollection(tag)
                }}key={idx}>{`#${tag} `}</HashTag>
              ))}
            </HashTagBox>

          <LikeCommentBox>
            <CountBox>
              {myLike ? (
                <FavoriteIcon
                  style={{ fontSize: "20px", color: "#67332e", cursor:"pointer" }}
                  onClick={() => {
                    clickLikeButton();
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{ fontSize: "20px", color: Color.fontBlack, cursor:"pointer" }}
                  onClick={() => {
                    clickLikeButton();
                  }}
                />
              )}
              <CountText>{likeCount}개</CountText>
            </CountBox>

              <CountBox>
              <SmsOutlinedIcon onClick={() => {goDetailByComment()}} style={{ fontSize: "20px", color: Color.fontBlack, cursor:"pointer" }}/>
              <CountText onClick={() => {goDetailByComment()}}> {comments.length} 개</CountText>
              </CountBox>

              <CountBox>
                {
                  bookmark ? 
                  <BookmarkIcon 
                  style={{ fontSize: "20px", color: Color.fontBlack, cursor:"pointer" }}
                  onClick= {()=>{
                    bookMark()
                  }}
                  />
                  :
                  <BookmarkBorderOutlinedIcon 
                  style={{ fontSize: "20px", color: Color.fontBlack, cursor:"pointer" }}
                  onClick= {()=>{
                    bookMark()
                    ReactGA.event({
                      category: "Button",
                      action: "click bookmark button",
                      label: "bookmark",
                    });
                  }}
                  />
                }
    
              <CountText> 스크랩</CountText>
              </CountBox>

          </LikeCommentBox>

        </CardBox>
      </CartWrapper>
    </React.Fragment>
  );
};

const CartWrapper = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${Color.bgColor};
  margin-bottom: 3px;
`;

const CardBox = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  background-color: ${Color.mainColor};
  position: relative;
  overflow:hidden;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }

  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }

`;

const CommentUserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const UserLeftBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;

const ImgWrapper = styled.div`
width:40px;
height:40px;
border-radius:70%;
box-sizing:border-box;
margin-right:10px;
position:relative;
`

const ProfileImg = styled.img`
width: 100%;
height: 100%;
cursor:pointer;
`;


const Box = styled.div`
display:flex;
flex-direction:${(props) => props.direction};
align-items:center;
`

const UserRightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div`
  width:100vw;
  height:100vw;
  position: relative;

  @media ${(props) => props.theme.tablet} {
    width:420px;
    height:420px;
  }

  @media ${(props) => props.theme.desktop} {
    width:420px;
    height:420px;
  }
  
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit:cover;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: normal;
  margin: 0px 8px 0px 0px;
  cursor:pointer;
`;

const CreatedAt = styled.p`
  font-size: 10px;
  color: #9e9e9e;
  opacity: 0.5;
  margin: 0px;
`;

const ContentBox = styled.article`
  width: 100%;
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  aligh-items: flex-start;
  padding: 0px 24px;
  cursor:pointer;
`;

const BookTitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.9px;
  color: ${Color.black};
  margin: 0px 0px 8px 0px;
  font-weight:bold;
`;

const Quote = styled.p`
  font-size: 14px;
  letter-spacing: -0.28px;
  margin: 8px 0px;
  color: ${Color.quote};
  font-family: "Noto Serif KR", serif;
  font-weight: normal;
  white-space: pre-line;
  line-height: 1.71;
  border-radius:10px;
  cursor:pointer;
`;

const Content = styled.p`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin: 0px;
  color: ${Color.fontgray};
  white-space: pre-line;
  cursor:pointer;
  margin-bottom:15px;
`;

const HashTagBox = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding: 10px 20px 10px 20px;
  width:100%;
  flex-wrap: wrap;
  margin:0px;
  border-bottom:1px solid ${Color.CardHashTag};
`;

const HashTag = styled.li`
  border: 1px solid ${Color.CardHashTag};
  border-radius: 10px;
  color: ${Color.hashTagFont};
  font-size: 14px;
  margin: 0px 8px 0px 0px;
  padding: 5px 7px;
  cursor:pointer;
`;

const CountBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CountText = styled.p`
  font-size: 14px;
  margin: 0px 0px 0px 8px;
  cursor:pointer;
  color: ${Color.fontBlack};
`;


const LikeCommentBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  width: 100%;
  height: 48px;
`;


export default React.memo(ReviewCard);
