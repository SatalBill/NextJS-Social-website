import { withRedux } from "../../redux/lib/with-redux-store";

const Layout = ({ children }) => children;

export default withRedux(Layout);
