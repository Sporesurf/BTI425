import React from 'react';
//Add the Routing package
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

//define some REACT elements/components?
const Home = () => <h1>Home</h1>;

const Projects = () => <h1>Projects</h1>;

const NotFound = () => <h1>Not Found!</h1>;

const Sample = () => {
  let params = useParams();
  return <h1> Page {params.id} </h1>;
};
export default function Routing() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <br />
          <Link to="/Projects">Projects</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Sample/:id" element={<Sample />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
