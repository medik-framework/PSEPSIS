class Threshold:
    @staticmethod
    def getThreshold(key, AgeInYears, AgeGroupVitals, AgeGroupShock):
        if key == "HR":
            if AgeGroupVitals is None:
                return {"low": 50, "high": 130}
            if AgeGroupVitals in [1, 2]:
                return {"low": 100, "high": 205}
            if AgeGroupVitals == 3:
                return {"low": 90, "high": 190}
            if AgeGroupVitals == 4:
                return {"low": 80, "high": 190}
            if AgeGroupVitals == 5:
                return {"low": 70, "high": 140}
            if AgeGroupVitals in [6, 7]:
                return {"low": 60, "high": 140}
            if AgeGroupVitals in [8, 9]:
                return {"low": 60, "high": 100}
            return {"low": 50, "high": 130}
        
        elif key == "BP Dia":
            if AgeGroupVitals is None:
                return {"low": 60, "high": 80}
            if AgeGroupVitals == 1:
                return {"low": 35, "high": 53}
            if AgeGroupVitals in [2, 3]:
                return {"low": 37, "high": 56}
            if AgeGroupVitals == 4:
                return {"low": 42, "high": 63}
            if AgeGroupVitals == 5:
                return {"low": 57, "high": 76}
            if AgeGroupVitals in [6, 7, 8, 9]:
                return {"low": 64, "high": 83}
            return {"low": 60, "high": 80}
        
        elif key == "BP Sys":
            if AgeGroupVitals is None:
                return {"low": 100, "high": 180}
            if AgeGroupVitals == 1:
                return {"low": 60, "high": 180}
            if AgeGroupVitals in [2, 3]:
                return {"low": 70, "high": 180}
            if AgeGroupVitals in [4, 5, 6, 7]:
                return {"low": 70 + AgeInYears * 2, "high": 180}
            if AgeGroupVitals in [8, 9]:
                return {"low": 90, "high": 180}
            return {"low": 100, "high": 180}
        
        elif key == "MAP":
            if AgeGroupVitals is None:
                return {"low": 65, "high": 110}
            if AgeGroupVitals == 1:
                return {"low": 46, "high": 110}
            if AgeGroupVitals in [2, 3]:
                return {"low": 55, "high": 110}
            if AgeGroupVitals == 4:
                return {"low": 60, "high": 110}
            if AgeGroupVitals in [5, 6]:
                return {"low": 65, "high": 110}
            if AgeGroupVitals in [7, 8]:
                return {"low": 64, "high": 110}
            if AgeGroupVitals == 49:
                return {"low": 67, "high": 110}
            return {"low": 65, "high": 110}
        
        elif key == "Lactate":
            return {"low": 4.5, "high": 19.8}
        
        elif key == "CVP":
            return {"low": 8, "high": 12}
        
        elif key == "ScvO2":
            return {"low": 65, "high": 100}
        
        elif key == "Hgb":
            return {"low": 12, "high": 17}
        
        elif key == "Cardio Output":
            return {"low": 4, "high": 8}
        
        elif key == "PRA":
            return {"low": 0, "high": 100}
        
        elif key == "RR":
            if AgeGroupVitals is None:
                return {"low": 12, "high": 20}
            elif AgeGroupVitals in [1, 2]:
                return {"low": 12, "high": 50}
            elif AgeGroupVitals == 3:
                return {"low": 12, "high": 45}
            elif AgeGroupVitals == 4:
                return {"low": 12, "high": 28}
            elif AgeGroupVitals == 5:
                return {"low": 12, "high": 25}
            else:
                return {"low": 12, "high": 20}
            
        elif key == "SpO2":
            return {"low": 90, "high": 100}
        
        elif key == "PaO2":
            return {"low": 84, "high": 200}
        
        elif key == "PaCO2":
            return {"low": 38, "high": 42}
        
        elif key == "FiO2":
            return {"low": 0, "high": 1}
        
        elif key == "etCO2":
            return {"low": 25, "high": 65}
        
        elif key == "pH":
            return {"low": 7.4, "high": 8.0}
        
        elif key == "Base Excess":
            return {"low": -5, "high": 5}
        
        elif key == "BUN":
            return {"low": 6, "high": 24}
        
        elif key == "Urine Output":
            if AgeGroupShock is None:
                return {"low": 1, "high": 10}
            elif AgeGroupShock in [1, 2]:
                return {"low": 2.0, "high": 10}
            elif AgeGroupShock in [3, 4]:
                return {"low": 1.5, "high": 10}
            elif AgeGroupShock in [5, 6, 7]:
                return {"low": 1.0, "high": 10}
            else:
                return {"low": 1, "high": 10}
            
        elif key == "Creatinine":
            return {"low": 0.0, "high": 1.1}
        
        elif key == "Baseline Creatinine":
            return {"low": 0.0, "high": 1.1}
        
        elif key == "Bicabonate":
            return {"low": 22, "high": 28}
        
        elif key == "Sodium":
            return {"low": 135, "high": 145}
        
        elif key == "Chloride":
            return {"low": 95, "high": 105}
        
        elif key == "Potassium":
            return {"low": 3.7, "high": 5.2}
        
        elif key == "Magnesium":
            return {"low": 7.4, "high": 8.0}
        
        elif key == "INR":
            return {"low": 0.5, "high": 2}
        
        elif key == "Platelet":
            return {"low": 100, "high": 450}
        
        elif key == "Bilirubin":
            return {"low": 0.1, "high": 1.99}
        
        elif key == "ALT":
            return {"low": 0, "high": 200}
        
        elif key == "WBC":
            if AgeGroupVitals == 1:
                return {"low": 5, "high": 34}
            elif AgeGroupVitals == 2:
                return {"low": 5, "high": 19.5}
            elif AgeGroupVitals == 3:
                return {"low": 5, "high": 17.5}
            elif AgeGroupVitals == 4:
                return {"low": 6, "high": 15.5}
            elif AgeGroupVitals == 5:
                return {"low": 4.5, "high": 13.5}
            elif AgeGroupVitals in [6, 7, 8, 9]:
                return {"low": 4.5, "high": 11.5}
            else:
                return {"low": 4, "high": 12}
            
        elif key == "Temp":
            if AgeGroupVitals in [1, 2]:
                return {"low": 36, "high": 37.9}
            elif AgeGroupVitals in [3, 4, 5, 6, 7, 8, 9]:
                return {"low": 36, "high": 38.4}
            else:
                return {"low": 36, "high": 38}
            
        elif key == "Core Temp":
            return {"low": 36, "high": 38}