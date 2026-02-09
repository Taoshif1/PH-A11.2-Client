import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import { useMemo, useEffect } from "react"; 

const BeADonor = () => {
  const { divisions, districts, upazilas, unions } = useLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      divisionId: "",
      districtId: "",
      upazilaId: "",
      unionId: "",
    },
  });

  const selectedDivision = watch("divisionId");
  const selectedDistrict = watch("districtId");
  const selectedUpazila = watch("upazilaId");

  // Reset dependent fields when parent changes
  useEffect(() => {
    setValue("districtId", "");
  }, [selectedDivision, setValue]);
  useEffect(() => {
    setValue("upazilaId", "");
  }, [selectedDistrict, setValue]);
  useEffect(() => {
    setValue("unionId", "");
  }, [selectedUpazila, setValue]);

  // Use useMemo for filtering
  const filteredDistricts = useMemo(() => {
    return districts.filter((d) => d.division_id === selectedDivision);
  }, [selectedDivision, districts]);

  const filteredUpazilas = useMemo(() => {
    return upazilas.filter((u) => u.district_id === selectedDistrict);
  }, [selectedDistrict, upazilas]);

  const filteredUnions = useMemo(() => {
    return unions.filter((un) => un.upazilla_id === selectedUpazila);
  }, [selectedUpazila, unions]);

  const onSubmit = (data) => {
    // Map IDs to Names
    const finalData = {
      ...data,
      division: divisions.find((d) => d.id === data.divisionId)?.name,
      district: districts.find((d) => d.id === data.districtId)?.name,
      upazila: upazilas.find((u) => u.id === data.upazilaId)?.name,
      union: unions.find((un) => un.id === data.unionId)?.name,
    };

    // optional: remove the raw IDs if not needed anymore
    // delete finalData.divisionId;
    // delete finalData.districtId;
    // delete finalData.upazilaId;
    // delete finalData.unionId;

    console.log("Donor Registration Data:", finalData);
    alert(
      `Thank you ${finalData.name}! Successfully registered in ${finalData.district}.`,
    );
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-3xl font-bold text-error text-center mb-2">
            Become a Lifesaver!
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Your small contribution can save a life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Gazi Taoshif"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Blood Group</span>
              </label>
              <select
                {...register("bloodGroup", { required: "Select blood group" })}
                className="select select-bordered"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="divider">Address Details</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Division */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Division</span>
              </label>
              <select
                {...register("divisionId", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Division</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name} ({div.bn_name})
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">District</span>
              </label>
              <select
                {...register("districtId", { required: true })}
                className="select select-bordered"
                disabled={!selectedDivision}
              >
                <option value="">Select District</option>
                {filteredDistricts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Upazila</span>
              </label>
              <select
                {...register("upazilaId", { required: true })}
                className="select select-bordered"
                disabled={!selectedDistrict}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((upz) => (
                  <option key={upz.id} value={upz.id}>
                    {upz.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Union */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Union</span>
              </label>
              <select
                {...register("unionId", { required: true })}
                className="select select-bordered"
                disabled={!selectedUpazila}
              >
                <option value="">Select Union</option>
                {filteredUnions.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Number */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-semibold">Contact Number</span>
            </label>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="tel"
              placeholder="017XXXXXXXX"
              className="input input-bordered"
            />
          </div>

          <div className="card-actions mt-8">
            <button
              type="submit"
              className="btn btn-error text-white w-full text-lg"
            >
              Register as Donor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeADonor;
