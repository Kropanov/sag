import { LoaderScene } from './core/Scenes/LoaderScene/LoaderScene';
import { Manager } from './core/Scenes/Manager/Manager';

const manager = Manager.getInstance();
manager.initialize('#1099bb');

const loady: LoaderScene = new LoaderScene();
manager.changeScene(loady);
