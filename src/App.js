import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
/* import { HomeworkPage } from "./components/Homework.page"; */
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicParallelPage } from "./components/DynamicParallel.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";

const queryClinet = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClinet}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              {/* <li>
                <Link to="/homework">Homework</Link>
              </li> */}
            </ul>
          </nav>
          <Switch>
            <Route path="/rq-dependent">
              <DependentQueriesPage email="vishwas@example.com" />
            </Route>
            <Route path="/rq-dynamic-parallel">
              <DynamicParallelPage heroIds={[1, 3]} />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueriesPage />
            </Route>
            <Route path="/rq-super-heroes/:heroId">
              <RQSuperHeroPage />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            {/* <Route path="/homework">
              <HomeworkPage />
            </Route> */}
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpet={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
