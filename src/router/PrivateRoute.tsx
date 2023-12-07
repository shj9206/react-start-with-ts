import {useSelector} from 'react-redux';
import {Navigate, Route, RouteProps} from 'react-router-dom'; // React-Router v6
import {JSX} from 'react/jsx-runtime';

export function PrivateRoute(props: JSX.IntrinsicAttributes & RouteProps) {
    const token = useSelector(({auth}) => auth.token); // Redux 토큰 상태를 가져옵니다.

    return token
        ? <Route {...props} />    // 토큰이 있다면 해당 라우트에 진입을 허용합니다.
        : <Navigate to="/login" replace /> ; // 토큰이 없다면 로그인 화면으로 리다이렉트합니다.
}

export default PrivateRoute;