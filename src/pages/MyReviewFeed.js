import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from '@material-ui/icons/List';

//확인용
import FeedCard from "../components/FeedCard";
import Color from "../shared/Color";
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import {history} from "../redux/configStore";
import {useSelector} from "react-redux";

const MyReviewFeed = () => {
    const nickname = useSelector(state => state.user.user.nickname);

    return (
        <React.Fragment>
            <Header>
                <SearchBarBox>
                    <SearchIcon
                        style={{
                            width: "18px",
                            position: "absolute",
                            left: "10px",
                            color: "#f5f2f0",
                            marginLeft: "9%"
                        }}/>
                    <SearchBar placeholder="내가 작성했던 리뷰를 찾을 수 있어요"/>
                </SearchBarBox>
            </Header>
            <Background>
                <UserBox>
                <ProfileBox>
                    <ImageBox>
                        <ProfileImg></ProfileImg>
                    </ImageBox>
                    <UserInfo>
                    <UserTitle>'천재적인 돌고래 다이버'</UserTitle>
                    <Name>{nickname}</Name>
                    <Activity>작성한 에세이 12개 | 작성한 댓글 9개</Activity>
                    </UserInfo>
                </ProfileBox>
                    <MyActivityBox>
                        <MyActivity>
                            <CollectionsBookmarkOutlinedIcon style={{color: "#f5f2f0", fontSize: "23px", marginTop:"6px"}}/>
                            <Text style={{marginTop: "5px"}}>컬렉션</Text>
                        </MyActivity>
                        <MyActivity>
                            {/*<BookmarkOutlinedIcon style={{color: "#1168d7"}}/>*/}
                            {/*<Text>저장한 에세이</Text>*/}
                            <Text style={{fontWeight: "bold", fontSize: "18px", margin: "0px -2px 2px -2px"}}>9,999</Text>
                            <Text style={{marginTop: "4px"}}>팔로워</Text>
                        </MyActivity>
                        <MyActivity>
                            <Text style={{fontWeight: "bold", fontSize: "18px", margin: "0px -2px 2px -2px"}}>9,999</Text>
                            <Text style={{marginTop: "4px"}}>팔로워</Text>
                        </MyActivity>
                    </MyActivityBox>
                    <RankDetailButton>‘수심 0m 잠수 중’  <a style={{fontWeight: "lighter"}}>자세히보기</a></RankDetailButton>

                </UserBox>


            </Background>
            <FeedMain>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>

                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>

            </FeedMain>
            {/*<CollectButton>*/}
            {/*    나만의 북 컬렉션 만들기*/}
            {/*</CollectButton>*/}
        </React.Fragment>
    )
}

export default MyReviewFeed;

const Header = styled.div`
width: 100%;
  height: 92px;
  background-color: ${Color.fontBlack}
`;

const SearchBarBox = styled.div`
  width: 100%;
  margin : 32px auto 32px auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.fontBlack}
`;

const SearchBar = styled.input`
  width: 80%;
  height: 45px;
  border: 1px solid ${Color.fontGray};
  border-radius: 12px;
  background-color: ${Color.fontBlack};
  padding: 0px 0px 0px 8%;
  //padding: 0px 0px 0px 30px;
  :focus {
    outline: none;
  }
  ::placeholder{
    color: ${Color.white};
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 200;
    letter-spacing: 0.8px;
    padding-left: 20px;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 278px;
  border: none;
  margin-top: -2px;
  background-color: ${Color.fontBlack};
`;
const UserBox = styled.div`
  width: 100%;
  height: 320px;

`
const ProfileBox = styled.div`
  width: 80%;
  height: auto;
  margin: 20px auto 0 21px;

`;


const ImageBox = styled.div`
  width: 100%;
  height: 60px;
  display: inline-block;
  margin-top: 28px;
`;

const UserInfo = styled.div`
float: right;
  width: 100%;
  margin: -28.5% 0 0 0;
  
`

const ProfileImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 72px;
  background: tomato;
  float: left;
  margin-top: -4%;
`;

const UserTitle = styled.p`
  margin: 5px 5px 5px 4.5em;
  color: ${Color.white};
  font-family: 'Noto Serif KR', serif;
  font-size: 14px;
`;

const Name = styled.p`
  margin: -5px 5px 5px 4.5em;
  color: ${Color.white};
  font-family: 'Noto Serif KR', serif;
  font-size: 14px;
`;

const Activity = styled.p`
  width: 100%;
  color: ${Color.fontGray};
  margin: 8px 5px 5px 4.5em;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  
`;

const MyActivityBox = styled.div`
  width: 88%;
  height: 68px;
  border-radius: 12px;
  display: flex;
  margin: 10px auto;
  border: 1px solid ${Color.fontGray};
 
  
`;

const MyActivity = styled.div`
  width: 33.3%;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.p`
  color: ${Color.white};
  margin: 5px;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const RankDetailButton = styled.button`
width: 88%;
  height: 36px;
  background-color: ${Color.fontGray};
  border: none;
  border-radius: 12px;
  color: ${Color.white};
  font-family: 'Noto Sans KR', sans-serif;
  margin: 6px auto 0px 6%;
`;

const FeedMain = styled.div`
  width: 100%;
  margin: auto;
  height: auto;
  //border: 1px solid black;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 33.2% 33.3% 33.4%;
  grid-auto-rows: 125px;
`;
//
// const CollectButton = styled.button`
//   width: 85%;
//   height: 7%;
//   position: fixed;
//   margin: 0 auto;
//   top: 93vh;
//   left: 0;
//   right: 0;
//   z-index: 100;
//   border: none;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   gap: 10px;
//   padding: 12px 69px;
//   border-radius: 12px;
//   background-color: #1168d7;
//   color: #ffffff;
//   font-size: 1em;
//   font-weight: bold;
//   margin: -10vh auto;
//   display: flex;
// `;
//



