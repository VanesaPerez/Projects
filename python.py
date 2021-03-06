# -*- coding: utf-8 -*-
# ---------------------------------------------------------------------------
# python.py
# Created on: 2017-11-02 18:57:38.00000
#   (generated by ArcGIS/ModelBuilder)
# Usage: python <RedNaturalBoolean> <EspaciosBoolean> <ReservasBiosferaBoolean> <colegiospublicos> <Result> 
# Description: 
# ---------------------------------------------------------------------------

# Import arcpy module
import arcpy 

arcpy.env.overwriteOutput = "True"

# Script arguments
RedNaturalBoolean = arcpy.GetParameterAsText(0)
if RedNaturalBoolean == '#' or not RedNaturalBoolean:
    RedNaturalBoolean = "true" # provide a default value if unspecified

EspaciosBoolean = arcpy.GetParameterAsText(1)
if EspaciosBoolean == '#' or not EspaciosBoolean:
    EspaciosBoolean = "true" # provide a default value if unspecified

ReservasBiosferaBoolean = arcpy.GetParameterAsText(2)
if ReservasBiosferaBoolean == '#' or not ReservasBiosferaBoolean:
    ReservasBiosferaBoolean = "true" # provide a default value if unspecified

colegiospublicos = arcpy.GetParameterAsText(3)
if colegiospublicos == '#' or not colegiospublicos:
    colegiospublicos = "Selection\\colegiospublicos" # provide a default value if unspecified

Result = arcpy.GetParameterAsText(4)
if Result == '#' or not Result:
    Result = "C:\\Users\\vanessa\\Documents\\ArcGIS\\Default.gdb\\espaciosNaturales_Intersect_1" # provide a default value if unspecified

# Local variables:
reservasBio = "Selection\\reservasBio"
reservasBio_Intersect3 = "in_memory\\reservasBio_Intersect3"
redNatura = "Selection\\redNatura"
redNatura_Intersect10 = "in_memory\\redNatura_Intersect10"
espaciosNaturales = "Selection\\espaciosNaturales"
espaciosNaturales_Intersect = "in_memory\\espaciosNaturales_Intersect"

# Process: IntersectReservasBio
arcpy.Intersect_analysis("Selection\\reservasBio #;Selection\\colegiospublicos #", reservasBio_Intersect3, "ALL", "", "INPUT")

# Process: IntersectColegiosPublicos
arcpy.Intersect_analysis("Selection\\redNatura #;Selection\\colegiospublicos #", redNatura_Intersect10, "ALL", "", "INPUT")

# Process: IntersectEspaciosNaturales
arcpy.Intersect_analysis("Selection\\espaciosNaturales #;Selection\\colegiospublicos #", espaciosNaturales_Intersect, "ALL", "", "INPUT")

# Process: IntersectFinal
if RedNaturalBoolean == True and  EspaciosBoolean == False and ReservasBiosferaBoolean == False:
    arcpy.Intersect_analysis("in_memory\\redNatura_Intersect10 #", espaciosNaturales_Intersect_1, "ALL", "", "INPUT")
elif EspaciosBoolean == True and  RedNaturalBoolean == False and ReservasBiosferaBoolean == False:
    arcpy.Intersect_analysis("in_memory\\espaciosNaturales_Intersect #", espaciosNaturales_Intersect_1, "ALL", "", "INPUT")
elif ReservasBiosferaBoolean == True and RedNaturalBoolean == False and EspaciosBoolean == False:
    arcpy.Intersect_analysis("in_memory\\reservasBio_Intersect3 #", espaciosNaturales_Intersect_1, "ALL", "", "INPUT")

arcpy.SetParameterAsText(4,espaciosNaturales_Intersect)
	#arcpy.Intersect_analysis("in_memory\\reservasBio_Intersect3 #;in_memory\\redNatura_Intersect10 #;in_memory\\espaciosNaturales_Intersect #", Result, "ALL", "", "INPUT")

