import os
import sys
import dotenv


sys.path.append(os.path.join(os.path.dirname(__file__), 'apps/TutorNest/src'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'apps/TutorNest/src/interface/dgal_site'))

dotenv.load_dotenv()

def main()-> int:
    if len(sys.argc >= 1):
        print(f"argv : {sys.argv[0]} , {sys.argv[0]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())