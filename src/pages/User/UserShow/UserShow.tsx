import React, { useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

// components
import Card from "../../../components/Card";
import Item from "../../../components/Item";
import Avatar from "../../../components/Avatar";
import Loading from "../../../components/Loading";

// service
import { useUsers, useRepos } from "../../../contexts";

// utils
import formatDate from "../../../utils/formatDate";

// styles
import {
    Container,
    Nav,
    BackButton,
    WrapperActions,
    Actions,
    EmailText,
    Title,
    Subtitle,
    WrapperDetails,
    WrapperDetailsMobile,
    GroupDetails,
    Details,
    ColorIcon,
    WrapperForm,
    WrapperSearch,
    TextUrl,
    TextNoResult,
} from "./style";

// assets
import ArrowLeftIcon from "../../../assets/arrow-left.svg";
import StarIcon from "../../../assets/star.svg";
import SearchIcon from "../../../assets/search.svg";

interface Props {}

const UserShow: React.FC<Props> = (props) => {
    const history = useHistory();
    const { id } = useParams();

    const { handleGetUser, currentUser, loadingUser } = useUsers();
    const { handleListRepos, repos, handleSortListRepos, handleSearchRepo, tempRepos, loadingRepos } = useRepos();

    useEffect(() => {
        handleGetUser(id);
        handleListRepos(id);
    }, []);

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSortListRepos(event.target.value);
    };

    const handleChangeRepos = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchRepo(event.target.value);
    };

    if (loadingUser || loadingRepos) {
        return <Loading />;
    }

    return (
        <Container>
            <Nav>
                <BackButton onClick={() => history.push("/users")}>
                    <img src={ArrowLeftIcon} alt="arrow-left" />
                </BackButton>
            </Nav>
            <Avatar className="lg" path={currentUser.avatar_url} />
            <WrapperActions>
                <Actions> {currentUser.followers} followers </Actions>
                <Actions> {currentUser.following} following </Actions>
                <Actions> 20 stars </Actions>
            </WrapperActions>
            <EmailText> {currentUser.email || currentUser.bio} </EmailText>

            <Card>
                <WrapperForm>
                    <WrapperSearch>
                        <img src={SearchIcon} alt="search-icon" />
                        <input placeholder="type a repo from user..." onChange={handleChangeRepos} />
                    </WrapperSearch>
                    <select name="" id="" onChange={handleChangeSelect}>
                        <option value="none">none</option>
                        <option value="DESC"> decreasing </option>
                        <option value="ASC"> growing </option>
                    </select>
                </WrapperForm>
                {(tempRepos.length ? tempRepos : repos).map((repo) => (
                    <Item key={repo.id}>
                        <Title> {repo.name} </Title>
                        <Subtitle> {repo.description} </Subtitle>
                        <WrapperDetails>
                            <section>
                                {repo.stargazers_count !== 0 && (
                                    <Details>
                                        <img src={StarIcon} alt="star" /> {repo.stargazers_count}
                                    </Details>
                                )}
                                {repo.language && (
                                    <Details>
                                        <ColorIcon /> {repo.language}
                                    </Details>
                                )}
                                <Details className="sm"> Updated at {formatDate(new Date(repo.updated_at))} </Details>
                            </section>
                            <TextUrl>
                                <a href={repo.html_url} target="blank">
                                    {repo.html_url}
                                </a>
                            </TextUrl>
                        </WrapperDetails>

                        <WrapperDetailsMobile>
                            <GroupDetails>
                                {repo.stargazers_count !== 0 && (
                                    <Details>
                                        <img src={StarIcon} alt="star" /> {repo.stargazers_count}
                                    </Details>
                                )}

                                {repo.language && (
                                    <Details>
                                        <ColorIcon /> {repo.language}
                                    </Details>
                                )}
                            </GroupDetails>
                            <Details className="sm"> Updated at {formatDate(new Date(repo.updated_at))} </Details>
                            <TextUrl>
                                <a href={repo.html_url} target="blank">
                                    {repo.html_url}
                                </a>
                            </TextUrl>
                        </WrapperDetailsMobile>
                    </Item>
                ))}

                {!repos.length && <TextNoResult>no results found</TextNoResult>}
            </Card>
        </Container>
    );
};

export default UserShow;
