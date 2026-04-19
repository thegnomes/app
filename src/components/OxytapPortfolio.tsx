import PortfolioTemplate from './PortfolioTemplate';
import { oxytapProject } from '@/data/portfolio-projects';

export default function OxytapPortfolio() {
  return <PortfolioTemplate project={oxytapProject} />;
}
