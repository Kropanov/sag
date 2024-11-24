import os
import sys
import shutil

ENV_TYPES = ['prod', 'dev']
PATH_TO_DATA = os.path.abspath('../data')
PATH_TO_PUBLIC = os.path.abspath('../../public')

def main(env='dev'):
    print('Environment:', env)

    source_dir = os.path.join(PATH_TO_DATA, env)
    destination_dir = PATH_TO_PUBLIC

    if not os.path.exists(source_dir):
        print(f"Source directory '{source_dir}' not found.")
        return

    os.makedirs(destination_dir, exist_ok=True)

    for item in os.listdir(source_dir):
        source_path = os.path.join(source_dir, item)
        destination_path = os.path.join(destination_dir, item)

        try:
            if os.path.isdir(source_path):
                shutil.copytree(source_path, destination_path, dirs_exist_ok=True)
            else:
                shutil.copy2(source_path, destination_path)
            print(f"Copied: {source_path} -> {destination_path}")
        except Exception as e:
            print(f"Error copying {source_path} -> {destination_path}: {e}")

    print(f"Copying files from {env} to public completed.")

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] in ENV_TYPES:
        main(sys.argv[1])
    else:
        main()
