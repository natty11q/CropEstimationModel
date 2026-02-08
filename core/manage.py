import os
import sys
import dotenv


sys.path.append(os.path.join(os.path.dirname(__file__), 'apps/TutorNest/src'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'apps/TutorNest/src/interface/dgal_site'))

dotenv.load_dotenv()

def main()-> int:
    c = 0
    for arg in sys.argv:
        print(f"argv{0} : {arg}")
        c+=1
    return 0


if __name__ == "__main__":
    sys.exit(main())