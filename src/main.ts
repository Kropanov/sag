import { LoaderScene } from './core/Scenes/LoaderScene/LoaderScene';
import { Manager } from './core/Scenes/Manager/Manager';

Manager.initialize(640, 480, '#1099bb');

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);
