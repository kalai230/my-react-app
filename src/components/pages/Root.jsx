
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { routes } from "../../Router/Route";
import { ROUTE_PATH } from "../../Router/RoutePath";
import Home from "./Home";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
       
        {routes.map(({ path, element, children }, index) => (
          <Route key={index} path={path} element={element}>
            {children?.map(({path,element},childIndex) => (
              <Route key={childIndex} path={path} element={element}/>
            ))} 
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

