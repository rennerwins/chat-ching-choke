import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import AdminMain from './AdminMain';
import AdminQuiz from './AdminQuiz';
import AdminParticipants from './AdminParticipants';
import AdminScores from './AdminScores';
import AdminWinner from './AdminWinner';
import AdminUsers from './AdminUsers';
import AdminPrize from './AdminPrize';
import AdminCoupon from './AdminCoupon';
import MessageContainer from '../../components/Admin/Message/MessageContainer';
import QuizContainer from '../../components/Admin/Quiz/QuizContainer';
import DefaultMessageContainer from '../../components/Admin/Default/DefaultMessageContainer';
import Menubar from '../../components/Admin/Menu/Menubar';

const AdminMenu = styled.div`
  background-color: #fff;
  z-index: 2;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.3);
`;

function Admin() {
  return (
    <div className="row" style={{ height: '100%' }}>
      <AdminMenu className="col-4 col-md-2">
        <Menubar />
      </AdminMenu>

      <div className="col" style={{ overflowY: 'scroll' }}>
        <Switch>
          <Route exact path="/admin" component={AdminMain} />
          <Route path="/admin/quiz" component={AdminQuiz} />
          <Route path="/admin/participants" component={AdminParticipants} />
          <Route path="/admin/scores" component={AdminScores} />
          <Route path="/admin/winner" component={AdminWinner} />
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/prize" component={AdminPrize} />
          <Route path="/admin/coupon" component={AdminCoupon} />
          <Route path="/admin/create" component={QuizContainer} />
          <Route path="/admin/message" component={MessageContainer} />
          <Route path="/admin/defaultmsg" component={DefaultMessageContainer} />
        </Switch>
      </div>
    </div>
  );
}

export default Admin;
